import React, { PureComponent } from 'react';
import PeopleCatalog from './PeopleCatalog'
import faker from 'faker'


const generateUserList = () => [...Array(1000).keys()].map(
  key => ({
    id: key,
    name: `${faker.name.lastName()}, ${faker.name.firstName()}`,
    bio: faker.lorem.lines(Math.random() * 100)
  })
)

class App extends PureComponent {
  constructor(props){
    super(props)

    this.setPeople = this.setPeople.bind(this)

    this.state = {
      people: generateUserList(),
      time: new Date()
    }

    this.pInterval = undefined
    this.ListRef = undefined
  }

  setPeople (people){
    this.setState({
      people
    })
  }

  componentDidMount () {


    this.pInterval = setInterval(() => {
      this.setPeople(
        generateUserList()
      )
    }, 2000)
  }

  componentWillUnmount () {
    clearInterval(this.pInterval)
  }

  render () {
    const { people } = this.state

    return (
      <div>
        <h1>{(new Date()).toISOString()}</h1>

        <PeopleCatalog users={people} />

      </div>)
  }
}

export default App
