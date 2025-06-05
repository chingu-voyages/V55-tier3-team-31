/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import {
	GoogleGenAI,
} from '@google/genai';

export default {
	async fetch(request, env, ctx) {
		// handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}
		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405 });
		}
		try {
			const { resources = [], searchResults = [], userMessage, conversationHistory = [] } = await request.json();

			if (!userMessage || typeof userMessage !== 'string') {
				return new Response(JSON.stringify({
					error: 'Invalid user message. Please provide a valid string.',
				}), {
					status: 400,
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}

			const ai = new GoogleGenAI({
				apiKey: env.GEMINI_API_KEY,
			});

			const config = {
				responseMimeType: 'text/plain',
				systemInstruction: [
					{
						text: `You are a helpful AI assistant for a programming resource finder application. 
      
Your role is to:
1. Help users find programming resources and tutorials
2. Provide guidance on learning paths and technologies
3. Answer questions about web development, programming languages, and software engineering
4. Be encouraging and supportive for learners at all levels

Current context:
- Total resources available: ${resources.length}
- Recent search results: ${searchResults.length} resources found

Guidelines:
- Keep responses conversational and helpful
- Use emojis sparingly but effectively
- Suggest specific searches when relevant
- If asked about resources, mention that users can search the database
- Be concise but informative
- Focus on practical advice

User message: "${userMessage}"

Respond as a friendly, knowledgeable programming mentor.`,
					}
				],
			};
			const model = 'gemini-2.5-flash-preview-04-17';
			const contents = [
                ...conversationHistory.map((message) => ({
                    role: message.role,
                    parts: [{ text: message.content }], // Convert content to parts array
                })),
				{
					role: 'user',
					parts: [
						{
							text: userMessage,
						},
					],
				},
			];

			const response = await ai.models.generateContentStream({
				model,
				config,
				contents,
			});

			let fullResponse = '';
			for await (const chunk of response) {
				fullResponse += chunk.text;
			}

			const updatedHistory = [
				...conversationHistory,
				{
					role: 'user',
					content: userMessage,
				},
				{
					role: "model",
					content: fullResponse,

				}
			];
			return new Response(JSON.stringify({
				response: fullResponse,
				conversationHistory: updatedHistory,
			}), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
		}
		catch (error) {
			console.error('Error processing request:', error);
			return new Response(JSON.stringify({
				error: 'An error occurred while processing your request. Please try again later.',
			}), {
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
		}
	}
};
