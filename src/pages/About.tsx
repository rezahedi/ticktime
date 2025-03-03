import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.content}>
      <h2>About the app</h2>
      <p><a href="https://github.com/rezahedi/ticktime" target="_blank">This application</a> was developed using React v18 as part of <a href="https://codethedream.org/classes/react-js/" target="_blank">Code the Dream's React</a> final assignment. I used React Router, react state management, and localStorage while utilizing Airtable as the core database, with data being fetched through the Airtable API.</p>
      <p>The Airtable have two tables linked together, first the todos and the other one is the categories.</p>
      <p>Logo designed by <a href="https://dribbble.com/shots/21276242-Task-Management-App-Icon" target="_blank">Henrik Abonyi</a>, I just convert it to SVG and customized the colors using Figma.</p>
      <img src='./figma_logo_screenshot.png' alt="logo in Figma screenshot" width='100%' />
      </div>
  )
}

export default About;