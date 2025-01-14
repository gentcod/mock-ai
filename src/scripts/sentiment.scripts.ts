export class SentimentScripts {
   insertResult: string = `INSERT INTO sentiment_results (user_email, text, score, timestamp) VALUES (?,?, ?, ?)`;
   checkExisting: string = `SELECT * FROM sentiment_results WHERE text = ? and user_email = ?`;
   getSingleResult: string = `SELECT * FROM sentiment_results WHERE id = ? and user_email = ?`;
   getMultipleResults: string = `SELECT * FROM sentiment_results WHERE user_email = ?`;
}