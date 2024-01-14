// color.worker.ts
addEventListener('message', ({ data }) => {
  
      const result = getCellColor(data.value);
      console.log(result)
      self.postMessage(result);
      
  
});

function getCellColor(value: number): string {
  switch (value) {
    case 1:
      return 'green';
    case 2:
      return 'yellow';
    case 3:
      return 'red';
    case 4:
      return 'blue';
    default:
      return 'white';
  }
}
