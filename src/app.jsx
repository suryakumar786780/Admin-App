import React from 'react'

import { Provider } from 'react-redux'
import { store } from './service/store'

import RouterComp from './router'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterComp />
      </Provider>
    </>
  )
}

export default App