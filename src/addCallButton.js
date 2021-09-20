import React from 'react'
import CallButton from './CallButton'

const addCallButton = (flex, manager) => {
  // display call button if current task is SMS and a "from" Task attribute was passed by bot
  flex.TaskCanvasHeader.Content.add(
    <CallButton key="callbutton" flex={flex} />,
    {
      if: (props) =>
        props.task &&
        props.task.attributes &&
        props.task.attributes.channelType === 'sms' &&
        props.task.attributes.from
    }
  )

  flex.Actions.addListener('beforeStartOutboundCall', async (payload) => {
    // here's some context that may be useful when placing the call
    //const {destination, taskAttributes} = payload;
    //const {from} = taskAttributes;

    // we could check the Worker for a preferred outbound number (if configured)
    const { outboundNumber } = manager.workerClient.attributes
    if (outboundNumber) {
      payload.callerId = outboundNumber
    } else {
      // perhaps callerid could be based on LOB, customer segment or other criteria
      //payload.callerId = '+18005551212';
    }
    // change channelType for the new (voice) task
    payload.taskAttributes.channelType = 'voice';
    console.log('updated outbound call payload to:', payload)
  })
}

export default addCallButton