import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
	{
		id: '0',
		message: 'Hello',
		trigger: '1',   // goes to id 1
	}, 
    {
		id: '1',
		message: 'What do you want?',
		trigger: '2',
	}, 
    {
		id: '2',    // user input
		user: true, 
		trigger: '3',
	}, 
    {
		id: '3',
		message: " You want {previousValue}?",
		trigger: 4,
	}, 
    {
		id: '4',
		options: [  // option list
			{ value: 1, label: 'View Frequently Asked Questions', trigger: 'faq' },
            { value: 2, label: 'End Conversation', trigger: 'end' },
		],
		//end: true
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
