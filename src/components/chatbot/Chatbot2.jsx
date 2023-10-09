import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
	{
		id: '0',
		message: 'Hello',   // can add users name if profile
		trigger: '3',   // goes to id 1
	}, 
    // add id 1 and 2 
    {
		id: '3',
		message: " You want {previousValue}?",
		trigger: 4,
	}, 
    {
		id: '4',
		options: [  // option list
			{ value: 1, label: 'View Frequently Asked Questions', trigger: 'faqStep' },
            { value: 2, label: 'End Conversation', trigger: 'end' },
		],
		//end: true
	},
    {
        id: 'faqStep',
        message: 'Here are some frequently asked questions:',
        trigger: 'faqOptions',
      },
      {
        id: 'faqOptions',
        options: [
          {
            value: 'faq1',
            label: 'How do I use the map?',
            trigger: 'faq1Answer',
          },
          {
            value: 'faq2',
            label: 'How to I create an account',
            trigger: 'faq2Answer',
          },
          // Add more FAQ questions 
        ],
      },
      {
        id: 'faq1Answer',
        message: 'To use the map #',
        trigger: 'faqOptions', // Return to the FAQ options after displaying the answer.
      },
      {
        id: 'faq2Answer',
        message: 'You can create an account by viewing the login page and selecting to create a new login.',
        trigger: 'faqOptions', // Return to the FAQ options after displaying the answer.
      },
    {
        id: 'faq', 
        message: 'What is your question:',
        trigger: 'faqInput',
    },
    {
        id: 'faqInput',
        user: true, 
        trigger: 'faqResponse',
    },
    {
        id: 'faqResponse',
        message: 'You asked: {previousValue}',
        trigger: '4', // Return to the main menu
    },
    {
        id: 'userInput',
        user: true,
    },
    {
        id: 'end',
        message: 'Thank you for using our chatbot!',
        end: true,
    }
];

// theme
const theme = {
	background: '#ffb8eb',
	headerBgColor: '#03209e',
	headerFontSize: '20px',
	botBubbleColor: '#0F3789',
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#FF5733',
	userFontColor: 'white',
};

// properties of the bot
const config = {
	//botAvatar: "img.png", // chatbot avater image
	floating: true,
};

function Chat() {
	return (
		<div className="Chat">
			<ThemeProvider theme={theme}>
				<ChatBot
                    // chatbot header
					headerTitle="Chatbot"
					steps={steps}
					{...config}

				/>
			</ThemeProvider>
		</div>
	);
}

export default Chat;
