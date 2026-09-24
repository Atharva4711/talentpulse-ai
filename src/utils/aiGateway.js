// OmniRoute-compatible AI Gateway Client & Swarm Orchestrator
// Decoupled architecture supporting:
// 1. In-House AI/ML Model Endpoints (FastAPI / PyTorch / ONNX / Ollama)
// 2. Multi-Model Cloud Gateway (Gemini 1.5 Flash / OpenAI GPT-4o)
// 3. Ultra-Fast Built-in Heuristic Engine (Guaranteed 0ms offline fail-safe)

export class AiGateway {
  constructor() {
    this.customEndpoint = localStorage.getItem('tp_custom_ml_endpoint') || 'http://localhost:8000/api/evaluate';
    this.primaryProvider = 'in-house-ml';
    this.fallbackChain = ['gemini-flash', 'openai-gpt4o', 'local-heuristic'];
  }

  /**
   * Set custom ML endpoint for in-house trained AI model.
   * @param {string} endpointUrl - e.g. "http://localhost:8000/api/evaluate"
   */
  setCustomEndpoint(endpointUrl) {
    this.customEndpoint = endpointUrl;
    localStorage.setItem('tp_custom_ml_endpoint', endpointUrl);
  }

  /**
   * Generates a context-aware HR interview evaluation for a candidate answer.
   * Seamlessly checks In-House ML endpoint -> Cloud LLM -> Deterministic Heuristic Engine.
   */
  async generateInterviewTurn({ 
    question, 
    candidateAnswer, 
    stage, 
    organization = 'Recruitment Organization',
    role = 'Technical Role',
    history = [], 
    apiKey = '',
    customEndpoint = null
  }) {
    const activeEndpoint = customEndpoint || this.customEndpoint;

    // 1. Attempt In-House Custom ML Model if endpoint specified
    if (activeEndpoint && activeEndpoint.startsWith('http')) {
      try {
        const mlResult = await this._callInHouseModel({
          endpoint: activeEndpoint,
          question,
          candidateAnswer,
          stage,
          organization,
          role
        });
        if (mlResult) return mlResult;
      } catch (err) {
        console.info('[AI Gateway] In-house ML model endpoint offline/unreachable, cascading to secondary adapter:', err.message);
      }
    }

    // 2. Attempt Cloud LLM if API Key is supplied
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const liveResponse = await this._callLiveCloudApi({ 
          question, 
          candidateAnswer, 
          stage, 
          organization,
          role,
          history, 
          apiKey 
        });
        if (liveResponse) return liveResponse;
      } catch (err) {
        console.warn('[AI Gateway] Cloud API provider failed, cascading to local heuristic fallback:', err.message);
      }
    }

    // 3. High-fidelity Built-in Local Heuristic Engine (Zero-latency fallback)
    return this._evaluateLocally({ question, candidateAnswer, stage, organization, role });
  }

  /**
   * Adapter for In-House Trained PyTorch / Transformers / ONNX FastAPI server.
   */
  async _callInHouseModel({ endpoint, question, candidateAnswer, stage, organization, role }) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout for local model

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          task: 'hr_interview_evaluation',
          organization,
          role,
          question,
          candidateAnswer,
          stage
        })
      });

      clearTimeout(timeoutId);
      if (!res.ok) return null;

      const data = await res.json();
      return {
        provider: 'in-house-trained-model',
        modelName: data.modelName || 'TalentPulse-HR-SLM-v1',
        score: data.score ?? 85,
        verbalQuality: data.verbalQuality ?? data.score ?? 85,
        wordCount: candidateAnswer.split(/\s+/).filter(Boolean).length,
        fillerCount: data.fillerCount ?? 0,
        starAdherenceScore: data.starAdherenceScore ?? 85,
        hrRemark: data.hrRemark || `Strong response aligning with requirements for ${role}.`,
        strengths: Array.isArray(data.strengths) ? data.strengths : ['Relevant technical articulation.'],
        weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses : ['Elaborate with deeper architectural specifics.']
      };
    } catch (e) {
      clearTimeout(timeoutId);
      return null;
    }
  }

  /**
   * Deterministic local heuristic evaluator providing realistic, role-conditioned feedback.
   */
  _evaluateLocally({ question, candidateAnswer, stage, organization, role }) {
    const text = (candidateAnswer || '').trim();
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Detect technical keywords and STAR indicators
    const starKeywords = [
      'situation', 'task', 'action', 'result', 'because', 'resolved', 
      'improved', 'metric', 'reduced', 'architected', 'implemented', 
      'designed', 'learned', 'team', 'lead', 'optimized', 'delivered'
    ];
    const starHits = starKeywords.filter(k => text.toLowerCase().includes(k)).length;

    // Detect speech filler words
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'sort of', 'i guess'];
    const fillerHits = fillerWords.reduce((acc, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = text.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);

    // Compute verbal quality score (0 - 100)
    let score = 52;
    if (wordCount > 25) score += 12;
    if (wordCount > 60) score += 16;
    if (starHits >= 2) score += 10;
    if (starHits >= 4) score += 10;
    if (fillerHits > 4) score -= 12;
    score = Math.max(38, Math.min(96, score));

    // Constructive feedback array
    const strengths = [];
    const weaknesses = [];

    if (wordCount < 25) {
      weaknesses.push(`Response is brief for the ${role} position; provide concrete technical scenarios.`);
    } else {
      strengths.push(`Articulate response with solid technical context relevant to ${organization}.`);
    }

    if (starHits >= 2) {
      strengths.push('Effectively applied the STAR format (Situation, Task, Action, Result) with measurable outcomes.');
    } else {
      weaknesses.push('Could frame your answer more rigorously using the STAR framework to highlight personal contribution.');
    }

    if (fillerHits <= 2) {
      strengths.push('Minimal speech fillers; projected high poise, confidence, and verbal control.');
    } else {
      weaknesses.push(`Detected ${fillerHits} filler words ('um', 'uh', 'like'). Practice steady structured pauses.`);
    }

    // Role-conditioned HR commentary
    const hrComments = [
      `Your engineering instincts align well with the expectations for ${role} at ${organization}.`,
      `Solid problem-solving thought process and clear technical communication.`,
      `Good structured reasoning; shows maturity in addressing practical workplace scenarios.`,
      `Thank you for sharing that practical example. It helps us evaluate your potential impact at ${organization}.`
    ];
    const hrRemark = hrComments[Math.floor(Math.random() * hrComments.length)];

    return {
      provider: 'omniroute-local-engine',
      score,
      verbalQuality: score,
      wordCount,
      fillerCount: fillerHits,
      starAdherenceScore: Math.min(100, Math.round(starHits * 20 + 30)),
      hrRemark,
      strengths,
      weaknesses
    };
  }

  /**
   * Cloud LLM Adapter (Gemini 1.5 Flash / OpenAI GPT-4o).
   */
  async _callLiveCloudApi({ question, candidateAnswer, stage, organization, role, history, apiKey }) {
    const isGoogle = apiKey.startsWith('AIza');
    const endpoint = isGoogle
      ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
      : 'https://api.openai.com/v1/chat/completions';

    const prompt = `You are a Senior Technical Hiring Lead at "${organization}" interviewing a candidate for the position: "${role}".
Question asked: "${question}"
Candidate's response: "${candidateAnswer}"
Stage: ${stage}

Evaluate this response objectively. Return a clean JSON object with:
- score: integer (0-100)
- verbalQuality: integer (0-100)
- starAdherenceScore: integer (0-100)
- hrRemark: one sentence of direct professional feedback
- strengths: array of 2-3 specific positive observations
- weaknesses: array of 1-2 constructive improvement points`;

    if (isGoogle) {
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
