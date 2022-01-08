async function main() {
    const compute = require('dcp/compute');
    // Rest of the code will go in the following sections:
    /* INPUT DATA */
      /* INPUT SET */
    const inputSet = Array.from('yelling!');
  
    /* WORK FUNCTION */
      /* WORK FUNCTION */
    async function workFunction(letter) {
      progress();
    return letter.toUpperCase();
    }
    /* COMPUTE FOR */
        /* COMPUTE FOR */
    const job = compute.for(inputSet, workFunction);
    job.public.name = 'toUpperCase';
  
      // SKIP IF: you do not need a compute group
    job.computeGroups = [{ joinKey: 'hackathon', joinSecret: 'dcp2021' }];


    /* PROCESS RESULTS */
      /* PROCESS RESULTS */
    let resultSet = await job.exec();
    resultSet = Array.from(resultSet);
    console.log(resultSet.toString().replace(',', ''));
  }
  require('dcp-client').init('https://scheduler.distributed.computer').then(main);








