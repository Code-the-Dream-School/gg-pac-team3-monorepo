
import styles from './SignUp.module.css'

const SignUp = () =>{
    return (
        <>
        <div className = {styles.container}>
                <section className = {styles.Headings}>
                     <h1  className = {styles.header}>SignUp</h1>
                     <p id = {styles.Name}>Start learning the fundamaentals of Coding</p>\
                 </section>
          
                <div className = {styles.Forms}>
                 <label className = {styles.FormName}>Full Name</label>
                 <input className = {styles.Input}></input>
                 <label className = {styles.FormName}>Email</label>
                 <input className = {styles.Input}></input>
                 <label className = {styles.FormName}>Password</label>
                 <input  className = {styles.Input}></input>
                 </div>
                 <section className = {styles.ClosingSection}>
            <button id = {styles.button}>Join as a student</button>
            <p id = {styles.Content}>Already on Learning Hub?</p>
           <a className  = {styles.Join}> Join Up</a>
           </section>
        </div>
        </>
    )

}
export default SignUp;