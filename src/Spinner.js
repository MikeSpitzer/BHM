import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner = () => (
    <Dimmer active>
        <Loader size="huge" content={"Building the Rage...."} />
    </Dimmer>
)

export default Spinner;