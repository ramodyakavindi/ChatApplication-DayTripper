import React, { useState } from "react";
import "./ChatBox.css"; // Importing the CSS file

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

  // Predefined set of hotel-related questions
  const questions = [
    "What types of events can I book at the hotel?",
    "Can I book a birthday party through Daytripper?",
    "What activities are available at the hotel?",
    "How do I book a room and event together?",
    "What facilities does the hotel offer for events?",
    "How do I contact?",
    "Are there any discounts for booking multiple events?",
    "Can I add special services like photographers or decorators?",
  ];

  // Hotel's predefined responses based on the question
  const predefinedAnswers = {
    event: "You can book various events like birthday parties, bridal showers, and more through Daytripper!",
    "birthday party": "Yes, you can easily book a birthday party at the hotel through Daytripper! You can choose from various event packages.",
    activities: "Our hotel offers a range of activities such as swimming, spa treatments, and more.",
    "book room": "You can book both a room and an event through Daytripper in a seamless process. Simply choose your dates and preferred services.",
    facilities: "We offer event spaces, catering services, and decoration options. The hotel also provides AV equipment and event coordinators to help make your event special.",
    contact: "Call us at 0715603856 for support.",
    discount: "Yes, we offer discounts for booking multiple events! Please contact our support team for more details on discounts and packages.",
    "special services": "Absolutely! You can add services like photographers, decorators, and entertainers for your events. Let us know your preferences, and we'll take care of the rest!"
  };

  // Handle question click, only update input without displaying the question in the chat
  const handleQuestionClick = (questionText) => {
    setQuestion(questionText); // Set the question in the input field
  };

  // Handle form submission (submit typed question or clicked question)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (question.trim()) {
      const newMessages = [
        ...messages,
        { sender: "user", text: question }, // Add user's question
      ];

      // Get the hotel's response based on the question
      const answer = getAnswer(question);

      // Add the bot's response to the chat
      newMessages.push({ sender: "bot", text: answer });

      // Update the messages state
      setMessages(newMessages);

      // Clear the input field
      setQuestion("");
    }
  };

  // Get bot answer based on hotel-related user questions
  const getAnswer = (question) => {
    const questionLower = question.toLowerCase();

    // Check if the question matches any predefined responses
    for (let key in predefinedAnswers) {
      if (questionLower.includes(key)) {
        return predefinedAnswers[key];
      }
    }

    return "Sorry, I couldn't find an answer to that question. Please feel free to ask anything related to booking events or activities!";
  };

  return (
    <div className="chatBoxContainer">
      <div className="chatBox">
        <div className="chatHeader">
          <span>Daytripper Chat</span>
        </div>

        {/* Display Predefined Hotel-Related Questions */}
        <div className="questionsList">
          {questions.map((q, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(q)} // Update input field without adding it to the chat
              className="questionButton"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Display Chat Messages */}
        <div className="messagesContainer">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "userMessage" : "botMessage"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Form for Custom Questions */}
        <form onSubmit={handleSubmit} className="inputForm">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about hotel events or services..."
            className="input"
          />
          <button type="submit" className="sendButton">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
