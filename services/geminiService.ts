
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, CareerPathData, DomainRecommendation, UserGoal } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Suggests exactly ONE domain or educational path based on inference questions.
 */
export const getDomainRecommendation = async (answers: Partial<UserAnswers>): Promise<DomainRecommendation> => {
  const modelName = 'gemini-3-flash-preview';
  const interestContext = answers.interestProfile?.join('; ') || 'Not provided';
  const isHigherStudies = answers.mainGoal === UserGoal.HIGHER_STUDIES;
  const isGovtJobs = answers.mainGoal === UserGoal.GOVT_EXAMS;

  let prompt = "";
  if (isHigherStudies) {
    prompt = `
      Student Context (Higher Studies Interest):
      - Branch: ${answers.branch}
      - Year: ${answers.year}
      - Preferences: ${interestContext}
      
      Suggest ONE specific higher studies path (e.g. MS in Computer Science abroad, M.Tech via GATE, MBA in India, etc.).
      Return JSON: {"domain": "string", "reason": "string"}. No emojis. Be brief.
    `;
  } else if (isGovtJobs) {
    prompt = `
      Student Context (Government Job Interest):
      - Branch: ${answers.branch}
      - Year: ${answers.year}
      - Preferences: ${interestContext}
      
      Suggest ONE specific government job path (e.g. UPSC CSE, Engineering Services Exam (ESE), PSU via GATE, Banking (IBPS), etc.).
      Return JSON: {"domain": "string", "reason": "string"}. No emojis. Be brief.
    `;
  } else {
    prompt = `
      Student Context:
      - Branch: ${answers.branch}
      - Year: ${answers.year}
      - Interests: ${interestContext}
      
      Suggest ONE tech domain from: Web Development, Data Science, Android Development, DevOps & Cloud, Cyber Security, AI / ML, Blockchain, Product Management.
      Return JSON: {"domain": "string", "reason": "string"}. No emojis. Be brief.
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            domain: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["domain", "reason"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Failed to get recommendation:", error);
    const fallback = isHigherStudies ? "M.Tech via GATE" : (isGovtJobs ? "UPSC Civil Services" : "Web Development");
    return { domain: fallback, reason: "Fallback suggestion." };
  }
};

/**
 * Generates the full 4-month roadmap.
 */
export const generateCareerGuidance = async (answers: UserAnswers): Promise<CareerPathData> => {
  const modelName = 'gemini-3-flash-preview';
  
  const isCore = answers.pathPreference === 'Core';
  const isHigherStudies = answers.mainGoal === UserGoal.HIGHER_STUDIES;
  const isGovtJobs = answers.mainGoal === UserGoal.GOVT_EXAMS;
  const domain = isHigherStudies || isGovtJobs ? answers.preferredRole : (isCore ? `Core Engineering in ${answers.branch}` : answers.preferredRole);

  let goalContext = "professional roadmap";
  let specificInstructions = "4 months of progressive steps. Concrete topics & 1 project. Industry links.";

  if (isHigherStudies) {
    goalContext = "academic preparation roadmap";
    specificInstructions = "Focus on Exam prep (GATE/GRE), profile building (LORs/Research), and application timelines.";
  } else if (isGovtJobs) {
    goalContext = "government exam preparation roadmap";
    specificInstructions = "Focus on syllabus coverage (General Studies + Technical), practice sets, previous year questions, and notification tracking.";
  }

  const prompt = `
    Career Architect Mode: ${goalContext}.
    Student: Branch ${answers.branch}, Year ${answers.year}, CGPA ${answers.cgpa}, Tier ${answers.tier}.
    Target: ${domain}.
    
    Deliver:
    1. 4 months of progressive steps.
    2. ${specificInstructions}
    3. 3 Market demand or competition trends.
    4. NO EMOJIS. Response must be JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            suggestedDomain: { type: Type.STRING },
            marketTrends: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trend: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  demandLevel: { type: Type.STRING, enum: ['High', 'Rising', 'Stable'] }
                },
                required: ["trend", "impact", "demandLevel"]
              }
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  monthLabel: { type: Type.STRING },
                  title: { type: Type.STRING },
                  focus: { type: Type.STRING },
                  skillDepth: { type: Type.STRING },
                  topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                  practice: { type: Type.ARRAY, items: { type: Type.STRING } },
                  project: { type: Type.STRING },
                  internshipTip: { type: Type.STRING },
                  resources: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        link: { type: Type.STRING },
                        type: { type: Type.STRING },
                        tierSpecial: { type: Type.BOOLEAN }
                      },
                      required: ["title", "link", "type"]
                    }
                  }
                },
                required: ["monthLabel", "title", "focus", "skillDepth", "topics", "practice", "resources"]
              }
            }
          },
          required: ["explanation", "suggestedDomain", "marketTrends", "roadmap"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
