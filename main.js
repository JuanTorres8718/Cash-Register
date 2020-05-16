const currencyUnit = [
    {name:'ONE HUNDRED', value:100.00},
    {name:'TWENTY', value:20.00},
    {name:'TEN', value:10.00},
    {name:'FIVE', value:5.00},
    {name:'ONE', value:1.00},
    {name:'QUARTER', value:0.25},
    {name:'DIME', value:0.1},
    {name:'NICKEL', value:0.05},
    {name:'PENNY', value:0.01},
  
  ]
  
  function checkCashRegister(price, cash, cid) {
  
    const checkRegister =(statusRegister,changeRegister) =>( {
          status : statusRegister,
          change : changeRegister
    })
    let change = cash - price;
    let totalcid = cid.reduce( (accumulator, value)=>{
        return accumulator + value[1];
    },0.0 )
  
    if(totalcid < change){
      return checkRegister('INSUFFICIENT_FUNDS', [])
    }else if(totalcid === change){
      return checkRegister('CLOSED', cid)
    }
  
    cid = cid.reverse();
  
    let result = currencyUnit.reduce( (accumulator, currencyValue, index)=>{
      if(change>= currencyValue.value){
        let currentValue = 0.0;
        while(change>= currencyValue.value && cid[index][1]>=currencyValue.value){
          currentValue += currencyValue.value;
          change -= currencyValue.value;
          change = Math.round(change*100)/100;
          cid[index][1] -= currencyValue.value;
        }
        accumulator.push([currencyValue.name, currentValue]);
        return accumulator;
      }else{
        return accumulator;
      }
    }, []);
  
     if(result.length >0 && change === 0){
       return checkRegister( 'OPEN', result)
     }else{
       return checkRegister( 'INSUFFICIENT_FUNDS', []);
     }
    
  }
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
  
  