const RedirectHTML = (userData) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>User Verification</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding-top: 50px;
              background: #e6eef4;
            }
            .message {
              color: #fff;
              font-size: 30px;
              color: #2dbc5f;
            }
            .user-info {
              margin-top: 20px;
            }
            .redirect-btn {
              margin-top: 30px;
              padding: 10px 20px;
              font-size: 16px;
              background-color: #4a609f;
              color: white;
              border: none;
              cursor: pointer;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="message">Register Successfully</div>
          <div class="user-info">Email: ${userData.usr_email}</div>
          <button
            class="redirect-btn"
            onclick="window.location.href='http://localhost:5173';"
          >
            Go to Homepage
          </button>
        </body>
      </html>
    `;
};

module.exports = RedirectHTML;
