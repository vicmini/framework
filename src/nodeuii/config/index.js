import _ from 'lodash';

let config = {
  'viewDir': ''
}

const init = () => {
  if(process.env.NODE_ENV === 'development'){
    const localConfig = {
      port:8081
    }
    config = Object.assign(config,localConfig);
  }
  if(process.env.NODE_ENV === 'production'){
    const proConfig = {
      port:80
    }
    config = Object.assign(config,proConfig);
  }
  return config;
}

const result = init();
export default result;
