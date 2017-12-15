import React from 'react'
import Grid from 'material-ui/Grid'

import Header from './Header'

const Wrapper = ({ children }) => {
  return (
    <div>
      <Header />
      <Grid
        container
        justify="center"
        style={{ marginTop: '24px' }}
        spacing={0}
      >
        <Grid item xs={12} sm={9} md={6} xl={3}>
          {children}
        </Grid>
      </Grid>
    </div>
  )
}

export default Wrapper
