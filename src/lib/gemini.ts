import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

export async function generateTripPlan(tripDetails: {
  startingCity: string;
  destination: string;
  duration: string;
  budget: string;
  tripType: string;
  travelStyle: string;
  foodPref?: string;
  stayPref?: string;
  transport?: string;
  specialReq?: string;
}): Promise<string> {
  const prompt = `You are a professional travel planner for Indian travelers. Create a highly practical, personalized travel plan. Think like a local expert. Be confident and decision-oriented.

Trip Details:
- Starting City: ${tripDetails.startingCity}
- Destination: ${tripDetails.destination || "suggest the best destination"}
- Trip Type: ${tripDetails.tripType}
- Duration: ${tripDetails.duration} days
- Budget: ₹${parseInt(tripDetails.budget).toLocaleString("en-IN")}
- Travel Style: ${tripDetails.travelStyle}
- Food: ${tripDetails.foodPref || "Mix"} | Stay: ${tripDetails.stayPref || "Hotel"} | Transport: ${tripDetails.transport || "Train"}
${tripDetails.specialReq ? `- Special requests: ${tripDetails.specialReq}` : ""}

Create a COMPLETE plan with these EXACT section headers:

🌍 TRIP SUMMARY
Write 2-3 sentences summarizing the trip.

🛫 HOW TO REACH
Transport details and approximate cost.

🏨 STAY RECOMMENDATION
Give 1-2 hotel/stay options with prices per night.

📅 DAY-WISE PLAN
Day 1: Title
- Activity 1
- Activity 2
Day 2: Title
- Activity 1
- Activity 2
(continue for all days)

🍽 FOOD AND CAFES
- Restaurant 1: description and must-try dish
- Restaurant 2: description and must-try dish

🎯 MUST-DO EXPERIENCES
- Experience 1
- Experience 2
- Experience 3

💰 BUDGET BREAKDOWN
- Transport: ₹XXXX
- Accommodation: ₹XXXX
- Food: ₹XXXX
- Activities: ₹XXXX
- Miscellaneous: ₹XXXX
- Total: ₹XXXX

💡 SMART TIPS
- Tip 1
- Tip 2
- Tip 3

${tripDetails.tripType === "Couple" || tripDetails.tripType === "Honeymoon" ? "Include romantic spots, sunset points, cozy cafes and 1 special moment idea." : ""}
${tripDetails.tripType === "Solo" ? "Focus on safety, social hostels, and meeting other travelers." : ""}
${tripDetails.tripType === "Friends" ? "Add fun group activities, nightlife if appropriate, group experiences." : ""}
${tripDetails.tripType === "Family" ? "Keep comfortable pace, safe spots, child-friendly activities." : ""}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "";
}