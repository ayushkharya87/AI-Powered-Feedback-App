import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setAllFeedbacks(data);
    } catch (err) {
      console.error('Failed to load feedbacks:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await res.json();
      setFeedback(data.feedback);
      setUserInput(''); 
      fetchFeedbacks(); 
    } catch (error) {
      console.error(error);
      setFeedback('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100" style={{ backgroundColor: '#121212', color: '#f1f1f1' }}>
      <div className="row h-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <h2 className="mb-4 text-center">🧠 AI-Powered Feedback App</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="responseInput" className="form-label">Your Response</label>
                <textarea
                  id="responseInput"
                  className="form-control bg-dark text-light border-secondary"
                  rows="5"
                  placeholder="Write something..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-outline-light w-100 fw-bold"
                disabled={loading}
              >
                {loading ? 'Getting Feedback...' : '✨ Get Feedback'}
              </button>
            </form>

            {feedback && (
              <div className="card bg-dark text-light border-light mt-4 shadow">
                <div className="card-body">
                  <h5 className="card-title">AI Feedback</h5>
                  <p className="card-text">{feedback}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ----------- Feedback Cards Section ---------- */}
        <div className="col-md-6 p-5 overflow-auto" style={{ maxHeight: '100vh' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-light m-0">📜 Previous Responses</h4>
            <span className=" px-3 py-2">
              Total Responses: {allFeedbacks.length}
            </span>
          </div>
          <hr />
          {allFeedbacks.length === 0 ? (
            <p className="mt-5 text-center border p-3">No feedback yet. Submit your first response!</p>
          ) : (
            allFeedbacks.map((item, index) => {
              const date = new Date(item.createdAt || item.timestamp || Date.now());
              const formattedDate = date.toLocaleDateString();
              const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={index}
                  className="card mb-4 text-light shadow-lg border-0"
                  style={{
                    background: 'linear-gradient(145deg, #1a1a1a, #222)',
                    borderRadius: '1rem',
                  }}
                >
                  <div className="card-body p-4">
                    {/* Date & Time */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <small className="">
                        📅 {formattedDate} &nbsp;&nbsp; 🕒 {formattedTime}
                      </small>
                    </div>

                    {/* User Input */}
                    <div className="mb-4">
                      <h6 className="text-warning fw-bold mb-2">
                        🗣️ User Input
                      </h6>
                      <div className="p-3 rounded bg-dark border-start border-3 border-warning">
                        <p className="mb-0 text-light">{item.user_input}</p>
                      </div>
                    </div>

                    {/* AI Feedback */}
                    <div>
                      <h6 className="text-success fw-bold mb-2">
                        🤖 AI Feedback
                      </h6>
                      <div className="p-3 rounded bg-dark border-start border-3 border-success">
                        <p className="mb-0 text-light">{item.feedback}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
