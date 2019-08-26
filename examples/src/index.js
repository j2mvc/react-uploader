import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src/index.tsx'

class Demo extends Component {
  render() {
    return <div>
      <h1>test-nwb-component Demo</h1>
      <Example/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
 