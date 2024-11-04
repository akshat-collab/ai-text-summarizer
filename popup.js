document.getElementById('submit').addEventListener('click', async () => {
    const inputText = document.getElementById('input').value;
    const summary = await fetchAIResponse(inputText);
    document.getElementById('output').innerText = summary || "Error generating summary.";
});

async function fetchAIResponse(inputText) {
    const apiKey = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Your actual OpenAI API key
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Summarize the following text: ${inputText}` }]
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content; // Adjust based on the response structure
    } else {
        console.error('Error:', response.statusText);
        return null;
    }
}
