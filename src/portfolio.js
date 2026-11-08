export const github = 'https://github.com/alexcortes18'
export const linkedin = 'https://www.linkedin.com/in/alejandro-izaguirre-225b42157/'

export const chapters = [
  {
    id: 'honduras', time: '01 / Where I started', title: 'Honduras', image: 'falls', caption: 'Pulhapanzak, Honduras',
    intro: 'Honduras is home. It’s also where I first learned to build things that had to work outside a classroom.',
    notes: [['UNITEC', 'I studied mechatronics at UNITEC. I liked seeing mechanics, electronics, and programming come together in one system.'], ['First jobs', 'At Lear I supported ERP users. At Falcon Ingeniería I built a SCADA monitoring system for a coffee operation.']],
  },
  {
    id: 'factory-floors', time: '02 / INGEA', title: 'On the factory floor', image: 'controlPanel', caption: 'Industrial control panel, Honduras',
    intro: 'I worked on production lines, electrical meters, and the controls that kept machinery running.',
    notes: [['Cement blocks', 'I helped migrate a legacy panel on a cement block production line to a PLC and operator interface.'], ['Textiles and metering', 'I programmed a textile roller and helped install Schneider meters and Power Monitoring Expert so teams could see their consumption.']],
    link: ['/work/automation', 'See the automation project'],
  },
  {
    id: 'nthu', time: '03 / 2021–2023', title: 'NTHU life', image: 'dorm_view', caption: 'The view from my dorm, Hsinchu',
    intro: 'In September 2021 I moved to Taiwan to study at National Tsing Hua University (清華大學). It was my first time living so far from my family. Taiwan became a second home.',
    notes: [['The classroom', 'Advanced databases, data mining, and NLP gave me a new direction. I also helped teach Advanced Database Systems and worked on an EEG classification project.', 'brain_class'], ['The diploma', 'My master’s thesis looked at whether emotional entropy and informational coverage could help detect bias in product reviews.', 'alex_suit'], ['The people', 'I remember the friends, the campus picnics, and the evenings looking out from my dorm as much as the coursework.', 'nthu_picnic']],
  },
  {
    id: 'ibm', time: '04 / Summer 2022', title: 'Data engineering at IBM', image: 'taipei1', caption: 'Taipei, Taiwan',
    intro: 'During my master’s, I joined IBM’s Data Transformation Team in Taiwan for a summer internship.',
    notes: [['From transactions to signals', 'The team built customer behavior indicators. I wrote Python for Lambda and SQL procedures in Redshift, with Glue jobs processing batches of source data.']],
  },
  {
    id: 'taiwan', time: '05 / Life outside campus', title: 'A second home', image: 'rail', caption: 'From the series This is Taiwan',
    intro: 'After graduating, I taught English in Hsinchu and Zhubei. Away from the classroom I explored Taiwan with a camera, sometimes on a little 125 cc scooter.',
    notes: [['Learning from the other side', 'Teaching gave me practice explaining ideas in plain language and finding another way in when something didn’t click.'], ['The coastal road', 'One of my favorite trips was a solo ride of more than 800 km along Taiwan’s west coast.']],
    link: ['/photos/coastal-road', 'Take the coastal road'],
  },
  {
    id: 'today', time: '06 / Data and AI', title: 'What I build now', image: 'dongmen', caption: 'Dongmen Market, Taiwan',
    intro: 'I work on data and AI at Moxie Health. The problems look different from the factory floor, but I still like tracing a system from its inputs to the people who use it.',
    notes: [['Outlier', 'I evaluated AI generated code, wrote test cases, and explained where different approaches worked or failed.'], ['Moxie Health', 'I build Power BI dashboards, work on machine learning for clinical coding, and have prototyped an internal RAG system and a SQL data agent.']],
    link: ['/work', 'Explore selected work'],
  },
]

export const projects = [
  { id: 'power-bi', title: 'Power BI dashboards', area: 'Analytics', intro: 'Operational reporting for billing, audit, QA, and management.', method: 'I modeled data from multiple sources, wrote DAX for key metrics, and set up threshold alerts with Power Automate. The dashboards give different teams a shared view of their work.', outcome: 'The public case study describes the reporting workflow. The underlying clinical data stays internal.' },
  { id: 'cpt', title: 'CPT code prediction', area: 'Machine learning', intro: 'Ranking candidate procedure codes from clinical text for human review.', method: 'I used word and character TF-IDF features with one-vs-rest classification. I selected thresholds on validation data to produce a shortlist for reviewers. I also explored a separate ICD-10 prototype with ModernBERT.', outcome: 'The lab uses synthetic examples to explain how threshold choices affect the review queue.', link: ['/lab#threshold', 'Explore the threshold demo'] },
  { id: 'rag', title: 'Internal RAG system', area: 'LLMs', intro: 'A prototype that retrieves relevant context before answering a question.', method: 'I worked with a vector database and an LLM to ground answers in retrieved material. The public RAG Fundamentals repository shows a smaller example of the pattern.', outcome: 'The lab lets you inspect which public portfolio notes match a question.', link: [github + '/RAG_Fundamentals', 'View public RAG code'] },
  { id: 'sql-agent', title: 'Data AI Agent (SQL)', area: 'AI agents', intro: 'A prototype for asking questions about structured data in plain language.', method: 'The agent maps a question to a query against a known schema. Showing the generated SQL gives the user something concrete to inspect before trusting the result.', outcome: 'The public walkthrough shows example questions and queries against fictional data.', link: ['/lab#sql', 'Try the SQL walkthrough'] },
  { id: 'automation', title: 'Industrial automation', area: 'Mechatronics', intro: 'Modernizing the controls on a cement block production line.', method: 'The migration replaced a legacy panel with a PLC, relays, contactors, and an operator interface. I worked on how signals from the floor reached the controller and how operators could control the sequence.', outcome: 'It was an early lesson in building around the people who run a system every day.', image: 'controlPanel' },
  { id: 'eeg', title: 'EEG classification at NTHU', area: 'Research', intro: 'A team project exploring how EEG features affect mental state classification.', method: 'We compared models using a full feature set and frequency features alone. The repository includes the preprocessing and model notebooks.', outcome: 'This was one of my first experiences comparing ML approaches on real signals.', link: [github + '/bci-emotion-classification', 'View project notebooks'] },
]

export const photos = [
  ['dongmen', 'Dongmen Market', 'Taiwan'], ['rail', 'This is Taiwan', 'Taiwan'],
  ['umbrellas', 'Taichung umbrellas', 'Taiwan'], ['taroko', 'Taroko', 'Taiwan'],
  ['falls', 'Pulhapanzak', 'Honduras'], ['film', 'Japan on film', 'Japan'],
]
