import { InputChangeBody, InputChangeSetter} from '../types/HandleInputChangeType'
import { CustomChangeEvent } from '../types/events';

const handleInputChange = (body: InputChangeBody, setter: InputChangeSetter, event: CustomChangeEvent) => {
    setter({
    ...body,
    [event.target.name]: event.target.value,
    });
}

export default handleInputChange