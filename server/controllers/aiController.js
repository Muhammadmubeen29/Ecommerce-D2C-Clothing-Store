// @desc Generate SEO-friendly product description, meta title and keywords
// @route POST /api/ai/generate-product-content
// @access Private/Admin (should be protected where used)
export const generateProductContent = async (req, res) => {
  try {
    // Lazily import OpenAI SDK so the server can start even if the package
    // is not yet installed. Return a clear error if import fails.
    let OpenAI;
    try {
      OpenAI = (await import('openai')).default;
    } catch (impErr) {
      console.error('OpenAI SDK not available:', impErr);
      return res.status(500).json({ message: 'OpenAI SDK not installed on server. Run `npm install openai` in the server folder.' });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const {
      productName = '',
      category = '',
      price = '',
      features = '',
      audience = '',
    } = req.body || {};

    // Basic prompt construction with constraints
    const prompt = `You are an expert ecommerce copywriter. Given the product details below, generate:
1) An SEO-optimized, conversion-focused product description (150-250 words) with natural keyword usage.
2) A concise Meta Title (max 60 characters).
3) A comma-separated list of Meta Keywords relevant to the product.

Product Name: ${productName}
Category: ${category}
Price: ${price}
Key Features: ${features}
Target Audience: ${audience}

Requirements:
- Description length: 150-250 words.
- Use a persuasive, conversion-focused tone.
- Keep headings short if included.
- Meta Title must be <= 60 characters.
- Meta Keywords must be relevant and comma-separated.

Return the output as JSON with keys: description, metaTitle, metaKeywords. Do not include extra commentary.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You generate SEO product descriptions and metadata.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const text = completion.choices?.[0]?.message?.content || '';

    // Expecting model to return JSON; attempt to parse JSON from the output.
    let description = '';
    let metaTitle = '';
    let metaKeywords = '';

    try {
      // Try to locate a JSON block in the text
      const jsonStart = text.indexOf('{');
      const jsonStr = jsonStart !== -1 ? text.slice(jsonStart) : '';
      if (jsonStr) {
        const parsed = JSON.parse(jsonStr);
        description = parsed.description || '';
        metaTitle = parsed.metaTitle || '';
        metaKeywords = parsed.metaKeywords || '';
      }
    } catch (parseErr) {
      // Fallback: attempt to extract pieces heuristically
      const parts = text.split('\n\n');
      description = parts[0] || text;
      metaTitle = (parts.find(p => p.toLowerCase().includes('meta title')) || '').split(':').pop() || '';
      metaKeywords = (parts.find(p => p.toLowerCase().includes('meta keywords')) || '').split(':').pop() || '';
    }

    // Trim and enforce metaTitle length
    metaTitle = metaTitle.trim().slice(0, 60);
    metaKeywords = metaKeywords.trim();
    description = description.trim();

    return res.json({
      description,
      metaTitle,
      metaKeywords,
    });
  } catch (error) {
    console.error('AI Generation Error:', error);
    return res.status(500).json({ message: 'Failed to generate product content' });
  }
};

export default {
  generateProductContent,
};
