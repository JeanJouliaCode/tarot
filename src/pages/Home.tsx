import Avatar from 'components/Avatar'
import Button from 'components/Button'
import Text from 'components/Text'
import 'styles/Home.scss'
var UsernameGenerator = require('username-generator');


export default function Home(){
  const basePseudo = UsernameGenerator.generateUsername();

  return(
  <div className="page home">
      <div className="home__container">
        <div className="title"><Text content="Tarot"/></div>
        <div className="home__avatar_container">
          <Avatar/>
          <div className="home__pseudo_container avatar_container">
            <Text content="Choose a character and a name"/>
            <input type="text" className="home__pseudo" placeholder={basePseudo}/>
            <Button label="Create game" onClick={()=> console.log('clicked!')}/>
          </div>
        </div>
      </div>
  </div>
  )
}