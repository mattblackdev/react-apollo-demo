import React from 'react'
import Button from 'material-ui/Button'
import Chevron from 'material-ui-icons/ChevronLeft'
import { withRouter } from 'react-router-dom'

const BackButton = ({ history }) => (
  <Button raised onClick={() => history.goBack()} style={{ marginBottom: 24 }}>
    <Chevron /> Back
  </Button>
)

export default withRouter(BackButton)
