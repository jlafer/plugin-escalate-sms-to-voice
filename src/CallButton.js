import * as React from 'react'
import { withTaskContext, IconButton } from '@twilio/flex-ui'
import { css } from 'emotion'

import Call from '@material-ui/icons/Call'

const callbutton = css`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 2px;
  margin-left: 8px;
  border-radius: 50%;
  align-self: center;
`

export class CallButton extends React.Component {

  /*
    render a call button whose onClick handler starts an O/B call, passing
    the current customer's phone number as the default destination
  */
  render() {
    const { attributes, defaultFrom } = this.props.task
    return (
      <IconButton
        icon={<Call />}
        className={callbutton}
        onClick={(e) => {
          this.props.flex.Actions.invokeAction('StartOutboundCall', {
            destination: defaultFrom,
            taskAttributes: { ...attributes }
          })
        }}
      />
    )
  }
}

// NOTE: using the 'withTaskContext' decorator (or HOC) provides CallButton
// with 'task' in props, which is the current task; they can be updated when
// the call is placed
export default withTaskContext(CallButton);