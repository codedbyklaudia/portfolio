// Each project can have a "challenge" and "learned" text (the two cards at
// the bottom of its page).
//
//  - challengeKey / learnedKey  are translation keys, so you can translate
//    them later in your language files (same way as the captions).
//  - challenge / learned        are the English texts used until a
//    translation exists for the visitor's language.
//
// Separate paragraphs with a blank line (\n\n).
//
// Screenshots work the same way: captionKey is the translation key, and
// caption is the English text used until a translation exists.

export const projects = [
  {
    id: 'barkbuddy-android',
    name: 'BarkBuddy App',
    platformKey: 'platform.android',
    categoryKey: 'category.majorProject',
    year: '2025–2026',
    color: '#6B4FA0',
    taglineKey: 'project.barkbuddyAndroid.tagline',
    mockup: '/images/Mockup_bbapp.webp',
    bodyKeys: ['project.barkbuddyAndroid.body1', 'project.barkbuddyAndroid.body2'],
    tags: ['Java', 'Android', 'Firebase FCM', 'Socket.io', 'Gemini AI', 'Google Maps', 'Room', 'Retrofit', 'DataStore'],
    screenshots: [
      // The hero mockup. (project.barkbuddyAndroid.shot1 is the sign-in screen text.)
      { src: '/images/Mockup_bbapp.webp' },
      { src: '/images/barkbuddy_app_6.webp', captionKey: 'project.barkbuddyAndroid.shot2' },
      { src: '/images/barkbuddy_app_5.webp', captionKey: 'project.barkbuddyAndroid.shot3' },
      { src: '/images/barkbuddy_app_1.webp', captionKey: 'project.barkbuddyAndroid.shot4' },
      { src: '/images/barkbuddy_app_3.webp', captionKey: 'project.barkbuddyAndroid.shot5' },
      { src: '/images/barkbuddy_app_2.webp', captionKey: 'project.barkbuddyAndroid.shot6' },
      { src: '/images/barkbuddy_app_4.webp', captionKey: 'project.barkbuddyAndroid.shot7' },
    ],
    challengeKey: 'project.barkbuddyAndroid.challenge',
    challenge:
      "Building a full native Android app on my own, from the first sketch to a working product, as my BSc final project. A lot of different pieces had to work together: a Node.js backend, real-time chat over Socket.io, push notifications through Firebase, Google Maps, an AI assistant and a local database for offline use.\n\nKeeping all of that reliable on a real phone, and keeping the app responsive while it talks to the server, was the hardest part.",
    learnedKey: 'project.barkbuddyAndroid.learned',
    learned:
      "How to plan an app as a whole before writing it: which data lives on the phone (Room and DataStore), which lives on the server, and how the app should behave on a poor connection.\n\nI also learned how much time testing on a real device saves, and that a clean API is worth getting right early, because the web version uses the same backend.",
    link: null,
    roleKey: 'role.soloDeveloper',
    categories: ['app'],
  },
  {
    id: 'barkbuddy-web',
    name: 'BarkBuddy Web',
    platformKey: 'platform.webPlatform',
    categoryKey: 'category.majorProject',
    year: '2025–2026',
    color: '#8B6FBB',
    taglineKey: 'project.barkbuddyWeb.tagline',
    mockup: '/images/Mockup_bbweb.jpeg',
    bodyKeys: ['project.barkbuddyWeb.body1', 'project.barkbuddyWeb.body2'],
    tags: ['React', 'TypeScript', 'SCSS', 'Node.js', 'PostgreSQL', 'Neon', 'Render', 'Cloudinary'],
    screenshots: [
      { src: '/images/barkbuddy_web_home.png', captionKey: 'project.barkbuddyWeb.shot1' },
      { src: '/images/barkbuddy_web_register.png', captionKey: 'project.barkbuddyWeb.shot2' },
      { src: '/images/barkbuddy_web_dog.png', captionKey: 'project.barkbuddyWeb.shot3' },
      { src: '/images/barkbuddy_web_calendar.png', captionKey: 'project.barkbuddyWeb.shot4' },
      { src: '/images/barkbuddy_web_addevent.png', captionKey: 'project.barkbuddyWeb.shot5' },
      { src: '/images/barkbuddy_web_services.png', captionKey: 'project.barkbuddyWeb.shot6' },
      { src: '/images/barkbuddy_web_travel.png', captionKey: 'project.barkbuddyWeb.shot7' },
      { src: '/images/barkbuddy_web_requ.png', captionKey: 'project.barkbuddyWeb.shot8' },
    ],
    challengeKey: 'project.barkbuddyWeb.challenge',
    challenge:
      "Building a second platform on top of the first one's backend. The website had to speak the same API as the Android app, while adding features that suit a bigger screen: a service finder with Google Maps, a multi-step trip planner with PDF export, a community forum and a dashboard for businesses.\n\nMaking that many features feel like one consistent product was the main challenge.",
    learnedKey: 'project.barkbuddyWeb.learned',
    learned:
      "How to design a backend that serves two very different apps, and how much TypeScript helps by catching mistakes before users do.\n\nI also learned how to host a real project from end to end: a PostgreSQL database on Neon, the server on Render, and image uploads through Cloudinary.",
    link: 'https://barkbuddy.org.uk',
    roleKey: 'role.soloDeveloper',
    categories: ['web'],
  },
  // {
  //   id: 'henry',
  //   name: "Henry N'Guetta",
  //   platformKey: 'platform.web',
  //   categoryKey: 'category.portfolio',
  //   year: '2025',
  //   color: '#a27867',
  //   taglineKey: 'project.henry.tagline',
  //   mockup: '/images/Mockup_henryweb.webp',
  //   bodyKeys: ['project.henry.body1', 'project.henry.body2'],
  //   tags: ['React', 'Vite', 'SCSS', 'Express', 'Resend', 'FastPanda'],
  //   screenshots: [
  //     { src: '/images/henry_1.png', captionKey: 'project.henry.shot1' },
  //     { src: '/images/henry_2.png', captionKey: 'project.henry.shot2' },
  //     { src: '/images/henry_6.png', captionKey: 'project.henry.shot3' },
  //     { src: '/images/henry_5.png', captionKey: 'project.henry.shot4' },
  //   ],
  //   challengeKey: 'project.henry.challenge',
  //   challenge:
  //     "A real client with real expectations: a portfolio that had to look polished, load quickly and let visitors get in touch without any friction.\n\nBalancing a design-heavy site with performance, and making the contact form deliver messages reliably, took the most care.",
  //   learnedKey: 'project.henry.learned',
  //   learned:
  //     "How to work with a client: turning feedback into decisions and keeping the scope under control.\n\nOn the technical side, I learned how much images and animations affect loading time, and how to set up a contact form that really sends email (Express and Resend) and reaches the inbox.",
  //   link: 'https://henryclaudnguetta.co.uk',
  //   roleKey: 'role.soloDeveloperDesigner',
  //   categories: ['web'],
  // },
  {
    id: 'synapse',
    name: 'Synapse 2066',
    platformKey: 'platform.web',
    categoryKey: 'category.collaborative',
    year: '2025',
    color: '#457B9D',
    taglineKey: 'project.synapse.tagline',
    mockup: '/images/synapse_mockup.webp',
    bodyKeys: ['project.synapse.body1'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    screenshots: [
      { src: '/images/synapse_home.png', captionKey: 'project.synapse.shot1' },
      { src: '/images/synapse_corpo.png', captionKey: 'project.synapse.shot2' },
      { src: '/images/synapse_cast.png', captionKey: 'project.synapse.shot3' },
      { src: '/images/synapse_crewdetails.png', captionKey: 'project.synapse.shot4' },
    ],
    challengeKey: 'project.synapse.challenge',
    challenge:
      "A team project with a deadline, where I was both a developer and the Scrum Master. The challenge was as much about people as about code: splitting the work so three developers could build at the same time without overwriting each other, and keeping the style and quality consistent across the whole site.",
    learnedKey: 'project.synapse.learned',
    learned:
      "How to run a small team with Scrum: planning sprints, keeping the board honest and making decisions together.\n\nI also got much better at using Git as a team, with branches, pull requests and merge conflicts, and at giving and receiving feedback on each other's code.",
    link: 'https://synapse2066.netlify.app',
    roleKey: 'role.coDeveloperScrumMaster',
    credits: ['Angela Tang', 'Danylo Bondar'],
    categories: ['web', 'collab'],
  },
  {
    id: 'pyramid-null',
    name: 'Pyramid Null',
    platformKey: 'platform.android',
    categoryKey: 'category.collaborative',
    year: '2025',
    color: '#678f62',
    taglineKey: 'project.pyramidNull.tagline',
    mockup: '/images/mockup_pyramidnull.webp',
    bodyKeys: ['project.pyramidNull.body1'],
    tags: ['Java', 'Android Studio', 'XML', 'Voice Over Chatbot'],
    screenshots: [
      {
        src: '/images/pyramid_null_1.png',
        captionKey: 'project.pyramidNull.shot1',
        caption: "The create account page. Players fill in their details and choose the chatbot type for the voice assistant, Cleopatra or the Pharaoh.",
      },
      {
        src: '/images/pyramid_null_1.webp',
        captionKey: 'project.pyramidNull.shot2',
        caption: "The settings screen. You can switch the music and the guide voice on or off, choose who guides you, Cleopatra or the Pharaoh, and change the text size.",
      },
      {
        src: '/images/pyramid_null_2.webp',
        captionKey: 'project.pyramidNull.shot3',
        caption: "Players can change their avatar and their background.",
      },
      {
        src: '/images/pyramid_null_3.webp',
        captionKey: 'project.pyramidNull.shot4',
        caption: "The landing screen. New players can create an account, and returning players can log in.",
      },
      {
        src: '/images/pyramid_null_4.webp',
        captionKey: 'project.pyramidNull.shot5',
        caption: "The main game page. Players switch between three different rooms of the game to find tips on how to pass the level.",
      },
    ],
    challengeKey: 'project.pyramidNull.challenge',
    challenge:
      "Making a game guide feel like an experience, not a menu: ancient Egypt mixed with neon and glitch effects, plus a voice chatbot with two characters, Pharaoh and Cleopatra.\n\nGetting the voice, the animations and the screens to work together smoothly on a phone was the tricky part.",
    learnedKey: 'project.pyramidNull.learned',
    learned:
      "How to bring a strong visual theme into native Android with XML layouts and animations, and how voice features change the way you design an app: timing, volume, and giving users control, like the music and guide voice switches in the settings.\n\nWorking in a team also taught me to agree on the structure early, so everyone's screens fit together.",
    link: null,
    roleKey: 'role.coDeveloper',
    credits: ['Angela Tang', 'Danylo Bondar'],
    categories: ['app', 'collab'],
  },
  {
    id: 'lenstheory',
    name: 'Lens Theory',
    platformKey: 'platform.web',
    categoryKey: 'category.personalProject',
    year: '2026',
    color: '#2c6844',
    taglineKey: 'project.lenstheory.tagline',
    mockup: '/images/mockup_lenstheory_web.jpg',
    bodyKeys: ['project.lenstheory.body1', 'project.lenstheory.body2'],
    tags: ['Node.js', 'React', 'JavaScript', 'Stripe', 'Tailwind'],
    screenshots: [
      { src: '/images/lenstheory_1.jpg', captionKey: 'project.lenstheory.shot1' },
      { src: '/images/lenstheory_2.jpg', captionKey: 'project.lenstheory.shot2' },
      { src: '/images/lenstheory_3.jpg', captionKey: 'project.lenstheory.shot3' },
      { src: '/images/lenstheory_4.jpg', captionKey: 'project.lenstheory.shot4' },
      { src: '/images/lenstheory_5.jpg', captionKey: 'project.lenstheory.shot5' },
      { src: '/images/lenstheory_6.jpg', captionKey: 'project.lenstheory.shot6' },
      { src: '/images/lenstheory_7.jpg', captionKey: 'project.lenstheory.shot7' },
    ],
    challengeKey: 'project.lenstheory.challenge',
    challenge:
      "Building a booking platform that takes real payments online, and it was the first time I had ever worked with payments. Taking someone's money is very different from sending a form: every step has to be secure, and a booking should only be confirmed once the payment has actually gone through.\n\nLearning how Stripe works, and connecting it to my own Node.js backend without ever handling card details myself, was the biggest challenge.",
    learnedKey: 'project.lenstheory.learned',
    learned:
      "How online payments work from start to finish: creating the payment on the server, sending the customer to Stripe's secure checkout, and confirming the booking only once Stripe reports that the payment has succeeded.\n\nI also learned to test every path, including failed and cancelled payments, with Stripe's test cards, and to keep secret keys on the server and out of the code. I now feel confident adding payments to any project.",
    link: 'https://lenstheory.vercel.app',
    roleKey: 'role.soloDeveloper',
    categories: ['web'],
  },
];
// Your CV. Put the PDF in public/cv/ with this file name, then set `ready` to
// true to show the download buttons (the CV file on the hero desktop and the
// button in About).
export const cv = {
  ready: false,
  url: '/cv/Klaudia_Kulawik_CV.pdf',
  fileName: 'Klaudia_Kulawik_CV.pdf',
};
