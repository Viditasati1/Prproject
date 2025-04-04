
export const navLinks = [
  {
    id: "about",
    title: "Features",
  },
  
  
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "FAQ",
    title: "FAQ",
  },
];
// constants.js
const questionset = {
  questionnaires: [
    {
      age_group: "under_18",
      sections:  [
        {
          "name": "Self-Perception and Emotional Health",
          "questions": [
            {
              "text": "How often do you feel overwhelmed by your daily responsibilities?",
              "options": [
                "Almost never—I’ve got it under control",
                "Sometimes—it depends on the day",
                "Pretty often—I feel like there’s too much on my plate",
                "All the time—I’m constantly stressed"
              ]
            },
            {
              "text": "How would you rate your overall self-esteem?",
              "options": [
                "Honestly, not great—I doubt myself a lot",
                "Could be better—I struggle with confidence sometimes",
                "Decent—I have my ups and downs",
                "Pretty solid—I believe in myself"
              ]
            },
            {
              "text": "Do you ever feel guilty or ashamed about personal habits (like watching adult content or other things you keep private)?",
              "options": [
                "Not really—I don’t think about it much",
                "Sometimes—I wonder if I should cut back",
                "Often—I feel bad about it a lot",
                "All the time—it really bothers me"
              ]
            },
            {
              "text": "How often do you blame yourself or feel guilty for things in your life?",
              "options": [
                "Rarely—I try to let things go",
                "Sometimes—I overthink things now and then",
                "Often—I tend to be really hard on myself",
                "Always—I blame myself for everything"
              ]
            },
            {
              "text": "Do you think you set unrealistic expectations for yourself?",
              "options": [
                "Nope—I try to be reasonable",
                "Sometimes—I can be a little too ambitious",
                "Yeah, I put a lot of pressure on myself",
                "All the time—I expect way too much from myself"
              ]
            }
          ]
        },
        {
          "name": "Social Life and Relationships",
          "questions": [
            {
              "text": "Do you ever feel disconnected from people, even when you're around them?",
              "options": [
                "Not really—I feel pretty connected",
                "Sometimes—it depends on the situation",
                "Yeah, I feel like I don’t really fit in often",
                "All the time—I always feel alone"
              ]
            },
            {
              "text": "How comfortable are you opening up about your struggles to friends or family?",
              "options": [
                "Super comfortable—I talk about things openly",
                "Kind of comfortable—it depends on who I’m talking to",
                "Not really—I find it hard to open up",
                "Nope—I keep everything to myself"
              ]
            },
            {
              "text": "Do you avoid social situations because you're worried about being judged?",
              "options": [
                "Not at all—I don’t really think about it",
                "Sometimes—it depends on the people around me",
                "Often—I get nervous in social situations",
                "All the time—I’d rather just avoid people"
              ]
            }
          ]
        },
        {
          "name": "Habits and Coping Mechanisms",
          "questions": [
            {
              "text": "How often do you watch adult content or engage in similar activities?",
              "options": [
                "Rarely—it’s not really a big thing for me",
                "Occasionally—just now and then",
                "Pretty often—it’s a regular habit",
                "A lot—it’s something I do very frequently"
              ]
            },
            {
              "text": "Do you feel like these habits affect your mental health or daily life?",
              "options": [
                "Not at all—it’s just a normal thing",
                "A little—I’ve wondered about it sometimes",
                "Yeah, I feel like it has some negative effects",
                "Definitely—it’s something I struggle with"
              ]
            },
            {
              "text": "What’s your go-to way of dealing with stress?",
              "options": [
                "Healthy stuff—exercise, talking it out, hobbies",
                "Distractions—gaming, binge-watching, scrolling online",
                "Avoidance—I just try not to think about it",
                "Unhealthy habits—I do things that aren’t great for me"
              ]
            }
          ]
        },
        {
          "name": "Career and Financial Stress",
          "questions": [
            {
              "text": "How often do you worry about your career or future?",
              "options": [
                "Hardly ever—I feel pretty secure",
                "Sometimes—I have my moments of doubt",
                "A lot—I’m constantly overthinking it",
                "All the time—I feel totally lost about my future"
              ]
            },
            {
              "text": "How confident do you feel about managing your finances?",
              "options": [
                "Super confident—I have a good handle on things",
                "Mostly confident—but I still have things to learn",
                "Not very confident—I struggle to manage money well",
                "Honestly, I stress about money all the time"
              ]
            }
          ]
        },
        {
          "name": "Overall Mental Health",
          "questions": [
            {
              "text": "How often do you feel satisfied with your life?",
              "options": [
                "Almost always—I feel good about where I’m at",
                "Sometimes—it depends on my mood",
                "Not often—I feel like I should be happier",
                "Rarely—I feel pretty unsatisfied"
              ]
            },
            {
              "text": "Do you experience things like insomnia, low energy, or loss of appetite?",
              "options": [
                "Hardly ever—I’m doing okay",
                "Sometimes—it comes and goes",
                "Pretty often—I struggle with this a lot",
                "Constantly—it’s a big problem for me"
              ]
            },
            {
              "text": "Do you ever feel hopeless about the future?",
              "options": [
                "Not really—I believe things will work out",
                "Occasionally—some days are harder than others",
                "Yeah, I feel lost more often than I’d like",
                "All the time—I don’t see a way forward"
              ]
            },
            {
              "text": "How would you describe your overall happiness right now?",
              "options": [
                "Pretty happy—I feel good about life",
                "Somewhat happy—I have my ups and downs",
                "Neutral—I don’t feel strongly either way",
                "Not happy—I feel pretty down most of the time"
              ]
            }
          ]
        },
        {
          "name": "Thoughts and Self-Control",
          "questions": [
            {
              "text": "How often do you struggle with negative or intrusive thoughts?",
              "options": [
                "Rarely—I can shake them off easily",
                "Sometimes—I get caught up in them now and then",
                "Pretty often—it’s hard to stop overthinking",
                "All the time—I feel trapped by them"
              ]
            },
            {
              "text": "Do you feel like you need professional help for your mental health?",
              "options": [
                "Not really—I think I’m managing fine",
                "Sometimes—I’ve thought about it but haven’t acted",
                "Often—I feel like I could really use some help",
                "Definitely—I know I need support but don’t know where to start"
              ]
            },
            {
              "text": "How often do you feel motivated to make positive changes in your life?",
              "options": [
                "All the time—I love self-improvement",
                "Often—I try to push myself when I can",
                "Occasionally—I want to, but it’s hard to stay consistent",
                "Rarely—I don’t feel motivated at all"
              ]
            }
          ]
        }
      ]
      
      
    },
    {
      age_group: "18_to_25",
      sections: [
        {
          name: "Career and Life Balance",
          questions: [
            {
              text: "How do you feel about your work-life balance?",
              options: [
                "(a) Pretty solid, I’ve got it under control",
                "(b) It’s okay, but I could use a little more balance",
                "(c) It’s kinda rough, I struggle to keep up",
                "(d) What balance? It’s total chaos"
              ]
            },
            {
              text: "Do you feel like you’re moving towards your career goals at a good pace?",
              options: [
                "(a) Yeah! I’m feeling good about my progress",
                "(b) Mostly, but sometimes I doubt myself",
                "(c) Not really, I feel like I’m lagging behind",
                "(d) Nope, I feel totally lost"
              ]
            },
            {
              text: "How often does work or career stress get to you?",
              options: [
                "(a) Hardly ever, I’ve got a good handle on it",
                "(b) Sometimes, but I try to manage it",
                "(c) A lot, it drains me more than I’d like",
                "(d) All the time, I feel like I’m drowning"
              ]
            },
            {
              text: "Have you ever felt completely burned out from work or studies?",
              options: [
                "(a) Nah, I pace myself well",
                "(b) Once in a while, but I bounce back",
                "(c) More than I’d like, it’s exhausting",
                "(d) Yep, I feel drained all the time"
              ]
            }
          ]
        },
        {
          name: "Personal Habits and Coping Mechanisms",
          questions: [
            {
              text: "How frequently do you procrastinate on important tasks?",
              options: [
                "(a) Rarely, I stay on top of things",
                "(b) Occasionally, but I recover quickly",
                "(c) Often, it affects my productivity",
                "(d) Always, I struggle to get things done"
              ]
            },
            {
              text: "How often do you use social media or gaming as a way to escape from stress?",
              options: [
                "(a) Rarely, I use them in moderation",
                "(b) Occasionally, but I stay mindful",
                "(c) Often, I rely on them to unwind",
                "(d) Always, I lose track of time"
              ]
            },
            {
              text: "How often do you engage in physical exercise as a coping mechanism?",
              options: [
                "(a) Always, I exercise regularly",
                "(b) Often, but not consistently",
                "(c) Occasionally, only when I feel stressed",
                "(d) Rarely, I don’t exercise much"
              ]
            },
            {
              text: "Have you tried practicing mindfulness, meditation, or therapy for mental wellness?",
              options: [
                "(a) Always, and it helps me a lot",
                "(b) Often, but I sometimes forget",
                "(c) Occasionally, but I struggle to keep up",
                "(d) Rarely, I haven’t explored these"
              ]
            }
          ]
        },
        {
          name: "Relationships and Social Life",
          questions: [
            {
              text: "How often do you feel disconnected from friends or peers?",
              options: [
                "(a) Rarely, I have a strong support system",
                "(b) Occasionally, but I reach out",
                "(c) Often, I feel a bit isolated",
                "(d) Always, I struggle with loneliness"
              ]
            },
            {
              text: "Are you comfortable discussing your mental health with others?",
              options: [
                "(a) Always, I openly talk about it",
                "(b) Often, with close friends/family",
                "(c) Occasionally, but it’s difficult",
                "(d) Rarely, I keep it to myself"
              ]
            },
            {
              text: "Have you ever avoided social situations due to anxiety or fear of judgment?",
              options: [
                "(a) Rarely, I feel comfortable socially",
                "(b) Occasionally, but I manage it",
                "(c) Often, I struggle in social settings",
                "(d) Always, I avoid them completely"
              ]
            },
            {
              text: "Do you feel comfortable setting boundaries in friendships and relationships?",
              options: [
                "(a) Always, I stand up for my needs",
                "(b) Often, but it can be challenging",
                "(c) Occasionally, I find it difficult",
                "(d) Rarely, I struggle to say no"
              ]
            }
          ]
        },
        {
          name: "Financial Stress",
          questions: [
            {
              text: "How confident are you in managing your finances?",
              options: [
                "(a) Always, I handle money well",
                "(b) Often, but I still have worries",
                "(c) Occasionally, I struggle at times",
                "(d) Rarely, I feel financially insecure"
              ]
            },
            {
              text: "Have you ever felt financial stress affecting your mental health?",
              options: [
                "(a) Rarely, I manage stress well",
                "(b) Occasionally, but I cope with it",
                "(c) Often, it impacts my well-being",
                "(d) Always, it’s a major concern"
              ]
            },
            {
              text: "Do you feel financially dependent on others, and does it cause stress?",
              options: [
                "(a) Rarely, I am financially independent",
                "(b) Occasionally, but I am working on it",
                "(c) Often, it worries me a lot",
                "(d) Always, I feel very dependent"
              ]
            },
            {
              text: "How often do you feel guilty about spending money on leisure activities?",
              options: [
                "(a) Rarely, I budget well for fun",
                "(b) Occasionally, but I remind myself it’s okay",
                "(c) Often, I struggle with guilt",
                "(d) Always, I avoid spending on myself"
              ]
            }
          ]
        },
        {
          name: "Overall Mental Health",
          questions: [
            {
              text: "How frequently do you feel optimistic about your future?",
              options: [
                "(a) Always, I have a positive outlook",
                "(b) Often, but I sometimes worry",
                "(c) Occasionally, I struggle with doubts",
                "(d) Rarely, I feel uncertain and anxious"
              ]
            },
            {
              text: "How often do you experience anxiety or panic attacks?",
              options: [
                "(a) Rarely, I feel emotionally balanced",
                "(b) Occasionally, but I manage it",
                "(c) Often, it disrupts my daily life",
                "(d) Always, I struggle to cope"
              ]
            },
            {
              text: "Do you feel that your mental health affects your daily life and productivity?",
              options: [
                "(a) Rarely, I function well daily",
                "(b) Occasionally, but I push through",
                "(c) Often, it affects my tasks",
                "(d) Always, it’s a major challenge"
              ]
            },
            {
              text: "Do you actively take steps to improve your mental health and well-being?",
              options: [
                "(a) Always, I prioritize self-care",
                "(b) Often, but I could do more",
                "(c) Occasionally, I try but struggle",
                "(d) Rarely, I don’t focus on it"
              ]
            }
          ]
        }
      ]
    },
    {
      age_group: "25_to_40",
      sections:  [
          {
            "name": "Career and Life Balance",
            "questions": [
              {
                "text": "How do you feel about your work-life balance?",
                "options": [
                  "(a) Pretty solid, I’ve got it under control",
                  "(b) It’s okay, but I could use a little more balance",
                  "(c) It’s kinda rough, I struggle to keep up",
                  "(d) What balance? It’s total chaos"
                ]
              },
              {
                "text": "Do you feel like you’re moving towards your career goals at a good pace?",
                "options": [
                  "(a) Yeah! I’m feeling good about my progress",
                  "(b) Mostly, but sometimes I doubt myself",
                  "(c) Not really, I feel like I’m lagging behind",
                  "(d) Nope, I feel totally lost"
                ]
              },
              {
                "text": "How often does work or career stress get to you?",
                "options": [
                  "(a) Hardly ever, I’ve got a good handle on it",
                  "(b) Sometimes, but I try to manage it",
                  "(c) A lot, it drains me more than I’d like",
                  "(d) All the time, I feel like I’m drowning"
                ]
              },
              {
                "text": "Have you ever felt completely burned out from work or studies?",
                "options": [
                  "(a) Nah, I pace myself well",
                  "(b) Once in a while, but I bounce back",
                  "(c) More than I’d like, it’s exhausting",
                  "(d) Yep, I feel drained all the time"
                ]
              }
            ]
          },
          {
            "name": "Family and Social Life",
            "questions": [
              {
                "text": "Do you ever feel like family or social obligations are too much?",
                "options": [
                  "(a) Not really, I balance it pretty well",
                  "(b) Sometimes, but I manage to juggle things",
                  "(c) Yeah, it gets overwhelming at times",
                  "(d) All the time, I barely get a break"
                ]
              },
              {
                "text": "Is it hard for you to make time for yourself with all your responsibilities?",
                "options": [
                  "(a) Not at all, I always find time for myself",
                  "(b) Sometimes, but I make it work",
                  "(c) Yeah, I struggle to fit in 'me time'",
                  "(d) What’s personal time? I don’t even know anymore"
                ]
              },
              {
                "text": "Do you feel supported by your family when it comes to your goals and choices?",
                "options": [
                  "(a) 100%, they’ve got my back",
                  "(b) Mostly, but sometimes I feel misunderstood",
                  "(c) Not really, I feel like they don’t get me",
                  "(d) Nope, I feel like I’m on my own"
                ]
              },
              {
                "text": "Do you ever feel guilty about not spending enough time with friends or family?",
                "options": [
                  "(a) Nope, I spend plenty of time with them",
                  "(b) Sometimes, but I do my best",
                  "(c) Yeah, I feel like I should be there more",
                  "(d) All the time, I feel super guilty about it"
                ]
              }
            ]
          },
          {
            "name": "Stress and Coping",
            "questions": [
              {
                "text": "How often do money worries stress you out?",
                "options": [
                  "(a) Hardly ever, I feel pretty secure",
                  "(b) Sometimes, but I try not to let it get to me",
                  "(c) A lot, it’s a constant worry",
                  "(d) All the time, it keeps me up at night"
                ]
              },
              {
                "text": "How do you usually cope with stress?",
                "options": [
                  "(a) I’ve got healthy ways to handle it",
                  "(b) Sometimes I turn to distractions, but I try to be mindful",
                  "(c) Not great, I lean on unhealthy habits too often",
                  "(d) Stress runs my life, I don’t know how to handle it"
                ]
              },
              {
                "text": "Do you make time for self-care?",
                "options": [
                  "(a) Always! Gotta take care of myself",
                  "(b) Most of the time, but I could do better",
                  "(c) Not really, I struggle to fit it in",
                  "(d) Never, I barely even think about self-care"
                ]
              },
              {
                "text": "Have you ever taken a break because you felt mentally exhausted?",
                "options": [
                  "(a) Nah, I usually manage to keep going",
                  "(b) Once in a while, but I recover quickly",
                  "(c) Yeah, I’ve needed a break quite a few times",
                  "(d) Yes, I’m constantly running on empty"
                ]
              }
            ]
          },
          {
            "name": "Relationships and Emotional Health",
            "questions": [
              {
                "text": "Do you ever feel emotionally disconnected from the people around you?",
                "options": [
                  "(a) Not really, I feel pretty connected",
                  "(b) Sometimes, but I try to stay in touch",
                  "(c) Yeah, I feel distant more often than not",
                  "(d) All the time, I feel completely alone"
                ]
              },
              {
                "text": "Can you openly talk about your feelings with the people close to you?",
                "options": [
                  "(a) Yes! I have no problem sharing how I feel",
                  "(b) Most of the time, but some things are hard to say",
                  "(c) Not really, I struggle with opening up",
                  "(d) Nope, I keep everything bottled up"
                ]
              },
              {
                "text": "Have relationships (romantic or family) ever taken a toll on your emotions?",
                "options": [
                  "(a) Not really, I have mostly healthy relationships",
                  "(b) Sometimes, but I try to handle it well",
                  "(c) Yeah, relationships stress me out a lot",
                  "(d) All the time, it’s emotionally exhausting"
                ]
              },
              {
                "text": "Do you feel like the people in your life give you the emotional support you need?",
                "options": [
                  "(a) Yes, I feel very supported",
                  "(b) Mostly, but sometimes I wish for more",
                  "(c) Not really, I feel alone sometimes",
                  "(d) Nope, I don’t feel supported at all"
                ]
              }
            ]
          },
          {
            "name": "Happiness and Self-Care",
            "questions": [
              {
                "text": "How often do you make time for hobbies or things you love?",
                "options": [
                  "(a) All the time! My hobbies keep me happy",
                  "(b) Pretty often, but I wish I had more time",
                  "(c) Rarely, I barely get time for myself",
                  "(d) Never, I don’t even remember what I enjoy"
                ]
              },
              {
                "text": "Do you do things that genuinely make you happy?",
                "options": [
                  "(a) Yep, I make sure to do what I love",
                  "(b) Sometimes, but life gets busy",
                  "(c) Not often, I feel like I’m just going through the motions",
                  "(d) No, I can’t even remember the last time I felt truly happy"
                ]
              },
              {
                "text": "How do you feel about your overall lifestyle right now?",
                "options": [
                  "(a) I love it, I’m in a good place",
                  "(b) It’s decent, but there’s room for improvement",
                  "(c) Meh, I feel stuck sometimes",
                  "(d) I’m not happy at all with where I’m at"
                ]
              },
              {
                "text": "Do you feel like you’re making progress in your life?",
                "options": [
                  "(a) Definitely! I’m growing and improving",
                  "(b) Mostly, but I have moments of doubt",
                  "(c) Not really, I feel like I’m falling behind",
                  "(d) Nope, I feel totally stuck"
                ]
              }
            ]
          }
        ]
      
      
    }
  ]
};

// Task data categorized by age groups and sections
const firstTenDaysTasksSet = {
  "12_to_18": {
    "Self-Perception and Emotional Health": [
      ["Write down three things you like about yourself.", "Practice positive affirmations for 5 minutes."],
      ["Reflect on a recent emotional challenge and how you handled it.", "Avoid negative self-talk today."]
    ],
    "Social Life and Relationships": [
      ["Reach out to a friend or family member for a meaningful conversation.", "Join a social or hobby group."],
      ["Practice active listening in a conversation.", "Send an appreciation message to someone important."]
    ],
    "Habits and Coping Mechanisms": [
      ["Practice deep breathing for 5 minutes.", "Write in a gratitude journal before bed."],
      ["Go for a 20-minute walk.", "Reduce screen time by 30 minutes today."]
    ],
    "Career and Financial Stress": [
      ["Plan your weekly career or financial goals.", "Track your expenses for the day."],
      ["Learn about a new investment or savings option.", "Avoid unnecessary spending for a day."]
    ],
    "Overall Mental Health": [
      ["Do 5 minutes of mindfulness meditation.", "Write down your thoughts and emotions in a journal."],
      ["Engage in a relaxing activity (art, music, etc.).", "Avoid negative self-talk for the day."]
    ],
    "Thoughts and Self-Control": [
      ["Identify one negative thought and reframe it positively.", "Practice mindful eating at one meal today."],
      ["Take a break from social media for a few hours.", "Observe your emotions without reacting immediately."]
    ]
  },
  "18_to_25": {
    "Career and Academic Pressure": [
      ["Set a SMART goal for your career or studies.", "Break down a big academic/career goal into smaller steps."],
      ["Schedule 1 hour of focused, distraction-free work today.", "Learn a new productivity technique (like Pomodoro)."]
    ],
    "Personal Habits and Coping Mechanisms": [
      ["Try deep breathing exercises for 5 minutes.", "Maintain a gratitude journal and write 3 things you are grateful for."],
      ["Go for a 20-minute walk without your phone.", "Reduce screen time by 30 minutes today."]
    ],
    "Relationships and Social Life": [
      ["Reach out to a friend or loved one for a meaningful conversation.", "Practice active listening in a conversation today."],
      ["Join a social or hobby group related to your interests.", "Compliment someone genuinely today."]
    ],
    "Financial Stress": [
      ["Track your expenses for the day in a journal or app.", "Create a simple budget for the week."],
      ["Learn about one investment or savings option.", "Cook a meal at home instead of eating out."]
    ],
    "Overall Mental Health": [
      ["Do 5 minutes of mindfulness meditation.", "Write down your thoughts and emotions in a journal."],
      ["Engage in a relaxing activity (art, music, etc.).", "Avoid negative self-talk for the day."]
    ]
  },
  "25_to_40": {
    "Career and Life Balance": [
      ["Set clear boundaries between work and personal life.", "Plan your weekly schedule to balance work and leisure."],
      ["Dedicate 30 minutes to a passion project.", "Avoid work emails after office hours."]
    ],
    "Family and Social Responsibilities": [
      ["Have a meaningful conversation with a family member.", "Spend quality time with your children or spouse without distractions."],
      ["Help a family member with a task.", "Plan a family outing or gathering."]
    ],
    "Stress and Coping Mechanisms": [
      ["Practice 10 minutes of guided meditation.", "Write down three things causing stress and one action for each."],
      ["Try progressive muscle relaxation before bed.", "Take a 15-minute walk in nature."]
    ],
    "Relationships and Emotional Health": [
      ["Express appreciation to a friend or partner.", "Practice active listening during a conversation."],
      ["Resolve a small conflict peacefully.", "Write a letter to yourself reflecting on personal growth."]
    ],
    "Self-Care and Happiness": [
      ["Take an hour to do something that brings you joy.", "Limit social media use today."],
      ["Start a new book or hobby.", "Cook a healthy meal from scratch."]
    ]
  }
};


const services = [
  {
    title: "Personalized Anxiety Assessment",
    description:
    "Understand yourself better with RISEUP powered insights."
  },
  // {
  //   title: "AI-Powered Chat Support",
  //   description:
  //     "Get immediate, judgment-free support.",
  // },
  {
    title: "Virtual Role-Playing Sessions",
    description:
      "Practice social interactions with feedback.",
  },
  {
    title: "Tailored Therapy Modules",
    description:
      "Engage with Cognitive Behavioral Therapy (CBT) exercises and guides to overcome social fears step-by-step.",
  },
  {
    title: "Daily Affirmation Generator",
    description:
      "Receive personalized messages to uplift your day",
  },
];


export { services, questionset, firstTenDaysTasksSet };