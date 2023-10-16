import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
    {
		id: '0',
		message: "Hello",   // can add users name if profile
		trigger: '1',   // goes to id 1
	},
    {
		id: '1',
		options: [  // option list
			{ value: 1, label: 'View Frequently Asked Questions', trigger: 'faqStep' },
            { value: 2, label: 'End Conversation', trigger: 'end' },
		],
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
            label: 'How to use the map?',
            trigger: 'faq1Answer',
        },
        {
            value: 'faq2',
            label: 'How to create an account?',
            trigger: 'faq2Answer',
        },
        {
            value: 'faq3',
            label: 'How to login to my account?',
            trigger: 'faq3Answer',
        },
        {
            value: 'faq4',
            label: 'How to search for restaurant?',
            trigger: 'faq4Answer',
        },
        {
            value: 'faq5',
            label: 'How to view restaurant menu?',
            trigger: 'faq5Answer',
        },
          // Add more FAQ questions 
        ],
    },
    {
        id: 'faq1Answer',
        message: 'You can use the map by panning around with your mouse, scroll in and out for better coverage or viewing' 
        + 'filter options are located to the left, various buttons surround the map each with their own function. ',
        trigger: 'faqStep', // Return to the FAQ options after displaying the answer.
    },
    {
        id: 'faq2Answer',
        message: 'You can create an account by viewing the signup page from the navbar.',
        trigger: 'faqStep', // Return to the FAQ options after displaying the answer.
    },
    {
        id: 'faq3Answer',
        message: 'Visit the login page via the navbar button and sign in with login details.',
        trigger: 'faqStep', // Return to the FAQ options after displaying the answer.
    },
    {
        id: 'faq4Answer',
        message: 'From the main page utilise the search bar located just below the filter options.',
        trigger: 'faqStep', // Return to the FAQ options after displaying the answer.
    },
    {
        id: 'faq5Answer',
        message: 'Click on your restaurant of choice and select the menu option from the window that pops up.',
        trigger: 'faqStep', // Return to the FAQ options after displaying the answer.
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
        trigger: '1', // Return to the main menu
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
    console.log('Chatbot component rendering')
	return (
		<div className="Chat">
			<ThemeProvider theme={theme}>
				<ChatBot
                    // chatbot header
					headerTitle="BrokeBot"
					steps={steps}
					{...config}

				/>
			</ThemeProvider>
		</div>
	);
}

export default Chat;