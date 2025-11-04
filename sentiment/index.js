// 1️⃣ Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');

// 2️⃣ Initialize Express server
const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// 3️⃣ Initialize Sentiment Analyzer
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer; // common English stemmer
const analyzer = new Analyzer("English", stemmer, "afinn");

// 4️⃣ Create POST /sentiment endpoint
app.post('/sentiment', (req, res) => {
    try {
        const { sentence } = req.body;

        // 5️⃣ Validate input
        if (!sentence || typeof sentence !== 'string') {
            return res.status(400).json({ error: "Invalid input. Please provide a sentence." });
        }

        // 6️⃣ Analyze sentiment
        const tokens = sentence.split(' '); // simple tokenization
        const score = analyzer.getSentiment(tokens);

        // 7️⃣ Determine sentiment category
        let sentiment;
        if (score < 0) sentiment = 'negative';
        else if (score >= 0 && score <= 0.33) sentiment = 'neutral';
        else sentiment = 'positive';

        // 8️⃣ Return success response
        return res.json({ sentence, score, sentiment });
    } catch (err) {
        console.error('Error analyzing sentiment:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// 9️⃣ Start the server
app.listen(port, () => {
    console.log(`Sentiment Analysis Service running on port ${port}`);
});
