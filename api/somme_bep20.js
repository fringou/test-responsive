function somme_BEP20(){
  
    sheet = SpreadsheetApp.getActive().getSheetByName('bep20');
    tokenSymbol = sheet.getRange('I2:I').getValues().toString().split(",");//Logger.log(tokenSymbol)
    accountFrom = sheet.getRange('B2:B').getValues().toString().split(",");//Logger.log(accountFrom)
    contractadressbep20= sheet.getRange('N2:N').getValues().toString().split(",");
    tokenSymbol3 = [...new Set(tokenSymbol)];Logger.log(tokenSymbol3)
    indexSCAM= tokenSymbol3.indexOf("SCAM");if (indexSCAM!== -1){tokenSymbol3.splice(indexSCAM,1)}
    valeurBNB= sheet.getRange('D2:D').getValues().toString().split(",");
    operation= sheet.getRange('J2:J').getValues().toString().split(",");
    valeurEUR = sheet.getRange('L2:L').getValues().toString().split(",");
    changeEUR =parseFloat(1/lastPrice("EURBUSD"));Logger.log(tokenSymbol3)
    
    // fait le calcul de la somme de chaque token
      j=0;
      f=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wallet').getLastRow();
      balance=0;
      resIn=[];
      resOut=[];
      sommein=0;
      sommeout=0;
      dateMining = sheet.getRange('A2:A').getValues()
      datedebutminingMai2021 = new Date("05/01/2021")
      datedebutminingJuin2021 = new Date("06/01/2021")
      datedebutminingJuillet2021 = new Date("07/01/2021")
      datedebutminingAout2021 = new Date("08/01/2021")
      datedebutminingSeptembre2021 = new Date("09/01/2021")
      datedebutminingOctobre2021 = new Date("10/01/2021")
      datedebutminingNovembre2021 = new Date("11/01/2021")
      datedebutminingDecembre2021 = new Date("12/01/2021")
      datedebutminingJanvier2022 = new Date("01/01/2022")
      datedebutminingFevrier2022 = new Date("02/01/2022")
      datedebutminingMars2022 = new Date("03/01/2022")
      datedebutminingAvril2022 = new Date("04/01/2022")
      datedebutminingMai2022 = new Date("05/01/2022")
      for (o in tokenSymbol3){
      resIn = 0;
      for (var i in tokenSymbol) {if ((tokenSymbol[i] == tokenSymbol3[j])&& (operation[i]=="in"))   resIn +=parseFloat(valeurBNB[i]);}
      resOut = 0;
      for (var p in tokenSymbol) {if ((tokenSymbol[p] == tokenSymbol3[j])&& (operation[p]=="out"))   resOut +=parseFloat(valeurBNB[p]);}
      var tsl3=tokenSymbol3[j];
      sommein=resIn;
      sommeout=resOut;
      balance=sommein -sommeout;
    // Calcul de la somme de revenu mining
      resMiningMai2021=0, resMiningMai2021EUR=0
      resMiningJuin2021=0, resMiningJuin2021EUR=0
      resMiningJuillet2021=0, resMiningJuillet2021EUR=0
      resMiningAout2021=0, resMiningAout2021EUR=0
      resMiningSeptembre2021=0, resMiningSeptembre2021EUR=0
      resMiningOctobre2021=0, resMiningOctobre2021EUR=0
      resMiningNovembre2021=0, resMiningNovembre2021EUR=0
      resMiningDecembre2021=0, resMiningDecembre2021EUR=0
      resMiningJanvier2022=0, resMiningJanvier2022EUR=0
      resMiningFervrier2022=0, resMiningFervrier2022EUR=0
      resMiningMars2022=0, resMiningMars2022EUR=0
      resMiningAvril2022=0, resMiningAvril2022EUR=0
  
      for(var l in accountFrom){if(accountFrom[l]=="Ethermine Mining" && dateMining>=datedebutminingMai2021 && dateMining<datedebutminingJuin2021) resMiningMai2021+=parseFloat(valeurBNB[l]); resMiningeur+=parseFloat(valeurEUR[l]); tokenMining="ETH"};Logger.log(tokenMining)
      
      
  
      resMining=[];
      resMiningeur=[];
      tokenMining="";
      pairmining= "";
      resMining=0;
      for(var l in accountFrom){if(accountFrom[l]=="Ethermine Mining") resMining+=parseFloat(valeurBNB[l]); resMiningeur+=parseFloat(valeurEUR[l]); tokenMining="ETH"};Logger.log(tokenMining)
      resMiningeur=0;
      for(var u in accountFrom){if(accountFrom[u]=="Ethermine Mining") resMiningeur+=parseFloat(valeurEUR[u])};
      pairmining=tokenMining+"EUR";
      tokenLastPrice = lastPrice(pairmining);
      gainMiningAuPrixActuel= resMining*tokenLastPrice;
      ecart= gainMiningAuPrixActuel-resMiningeur;
    // modification wrap token
      const regex1 = RegExp("W", 'g',);
      wraptoken = regex1.test(tsl3);Logger.log(tsl3+"is Wrap token ? "+ wraptoken);
      if(wraptoken==true){ var re = /W/g;tsl3 = re[Symbol.replace](tsl3, ''); comptetype= "Dépot à vue"}Logger.log(tsl3);
      pair = tsl3+"BUSD"
      try{var changeBUSD= lastPrice(pair);}catch{try{
        for (var i in tokenSymbol) {if (tokenSymbol[i] == tokenSymbol3[j])
          changeBUSD=lastPricePanCakeSwap(contractadressbep20[i])
        }}catch{changeBUSD=0}};
      balanceEUR=(balance* changeBUSD)*changeEUR;
    j++
    if(balanceEUR>0){ 
    f++
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wallet').getRange(f,1).setValue("Total");
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wallet').getRange(f,2).setValue("Metamask B.S.C");
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wallet').getRange(f,3).setValue(tsl3);
    
   // SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wallet').getRange(f,8).setValue(resOut);
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wallet').getRange(f,4).setValue(balance);
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wallet').getRange(f,5).setValue(balanceEUR);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Minage').getRange('A4').setValue(tokenMining);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Minage').getRange('B4').setValue(resMining);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Minage').getRange('C4').setValue(resMiningeur);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Minage').getRange('D4').setValue(gainMiningAuPrixActuel);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Minage').getRange('E4').setValue(ecart);
   }}
    sheet = SpreadsheetApp.getActive().getSheetByName('wallet');
    sheet.getRange('A4:D').activate();
   }
  