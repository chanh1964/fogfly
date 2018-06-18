import { Request, Response } from 'express'
import logger from '../../utils/logger'

let AlgorithmController = (() => {
    let funcToUse = (props) => {
        logger.info("This is the original algorithm");
        return props + 1
    };
    let funcWrapper = (funcString) => {
        funcToUse = (props) => {
            // console.log("These are the data from the server itself " + {  })
            logger.info("This is the new algorithm");
            return Function('return ' + funcString)()(props)
        };
    }
    return {
        setFuncToUse: (req: Request, res: Response, next: Function) => {
            logger.info("set new func")
            funcWrapper(req.body.func);
            res.sendStatus(200);
        },
        getFuncToUse: (props) => funcToUse(props)
    }
})()
export default AlgorithmController;
