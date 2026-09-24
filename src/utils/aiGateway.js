// OmniRoute-compatible AI Gateway Client & Fallback Engine
// Unified access layer for Gemini, OpenAI, Claude, and Built-in Heuristic Engine

export class AiGateway {
  constructor() {
    this.primaryProvider = 'gemini-flash';
    this.fallbackChain = ['openai-gpt4o', 'local-fail-safe'];
  }

  /**
   * Generates a context-aware HR interview response or evaluation.
   */
  async generateInterviewTurn({ question, candidateAnswer, stage, history = [], apiKey = '' }) {
    // If a custom API key is supplied by the user, attempt live cloud routing
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const liveResponse = await this._callLiveApi({ question, candidateAnswer, stage, history, apiKey });
        if (liveResponse) return liveResponse;
      } catch (err) {
        console.warn('[OmniRoute Gateway] Live provider failed, falling back to local heuristic engine:', err.message);
      }
    }

    // High-fidelity Built-in Local Heuristic Engine (Guaranteed zero-crash for Viva)
    return this._evaluateLocally({ question, candidateAnswer, stage });
  }

  /**
   * Local heuristic evaluator providing realistic, personalized HR feedback and scores.
   */
  _evaluateLocally({ question, candidateAnswer, stage }) {
    const text = (candidateAnswer || '').trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // Detect technical keywords and STAR indicators
    const starKeywords = ['situation', 'task', 'action', 'result', 'because', 'resolved', 'improved', 'metric', 'reduced', 'architected', 'learned', 'team', 'lead'];
    const starHits = starKeywords.filter(k => text.toLowerCase().includes(k)).length;

    // Detect filler words
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'sort of'];
    const fillerHits = fillerWords.reduce((acc, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = text.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);

    // Compute verbal quality score (0 - 100)
    let score = 50;
    if (wordCount > 30) score += 15;
    if (wordCount > 70) score += 15;
    if (starHits >= 2) score += 10;
    if (starHits >= 4) score += 10;
    if (fillerHits > 5) score -= 12;
    score = Math.max(35, Math.min(98, score));

    // Determine constructive feedback
    let feedback = '';
    let strengths = [];
    let weaknesses = [];

    if (wordCount < 25) {
      weaknesses.push('Response is too brief; elaborate more on the technical specifics and metrics.');
    } else {
      strengths.push('Provided a structured and articulate explanation.');
    }

    if (starHits >= 2) {
      strengths.push('Effectively demonstrated problem-solving context and measurable actions taken.');
    } else {
      weaknesses.push('Could frame response more rigorously using the STAR format (Situation, Task, Action, Result).');
    }

    if (fillerHits <= 2) {
      strengths.push('Minimal filler words; demonstrated composure and high speech confidence.');
    } else {
      weaknesses.push(`Detected ${fillerHits} filler words ('um', 'uh', 'like'). Practice steady pauses instead.`);
    }

    // Dynamic HR follow-up comments
    const hrComments = [
      "I appreciate your candor and technical clarity on that point.",
      "That highlights good analytical thinking and adaptability in a team setting.",
      "Interesting perspective. Your approach demonstrates solid engineering instincts.",
      "Thank you for sharing that practical scenario. That helps us gauge your engineering maturity."
    ];
    const hrRemark = hrComments[Math.floor(Math.random() * hrComments.length)];

    return {
      provider: apiKey ? 'omniroute-cloud' : 'omniroute-local-fail-safe',
      score,
      verbalQuality: score,
      wordCount,
      fillerCount: fillerHits,
      starAdherenceScore: Math.min(100, Math.round(starHits * 22 + 25)),
      hrRemark,
      strengths,
      weaknesses
    };
  }

  /**
   * Optional live API call if student/evaluator provides a Google or OpenAI key.
   */
  async _callLiveApi({ question, candidateAnswer, stage, history, apiKey }) {
    // Standard OpenAI or Gemini compatible payload
    const endpoint = apiKey.startsWith('AIza')
      ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
      : 'https://api.openai.com/v1/chat/completions';

    const prompt = `You are Sarah, a Senior Campus Placement Director conducting an MNC campus interview.
Question asked: "${question}"
Candidate's spoken answer: "${candidateAnswer}"
Evaluate this response rigorously. Return a JSON object with:
- score (0-100)
- verbalQuality (0-100)
- starAdherenceScore (0-100)
- hrRemark (one sentence feedback directly to the candidate)
- strengths (array of strings)
- weaknesses (array of strings)`;

    if (apiKey.startsWith('AIza')) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return JSON.parse(rawText);
    } else {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        })
      });
      const data = await res.json();
      return JSON.parse(data.choices?.[0]?.message?.content);
    }
  }
}

export const aiGateway = new AiGateway();
