// specs.js
describe('Harsam Set Receiving Lots', function() {
  function makeid()
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function generateOptionValue(fieldname){
    return makeid()+"_"+new Date().valueOf()+fieldname;
  }

  it('should have 7 terminals', function() {
    browser.get('http://localhost:8002/');
    var terminalsList = element.all(by.repeater('terminal in terminals'));
    expect(terminalsList.count()).toEqual(7);
  });

  it('click on "Add New Supplier" should show harvester form', function() {
    browser.get('http://localhost:8002/#/terminal/1');
    expect(element(by.id('form-2')).isDisplayed()).toBeFalsy();
    element(by.id('toggle-2')).click();
    expect(element(by.id('form-2')).isDisplayed()).toBeTruthy();
  });

  it('fill new supplier data, submit should add to list of suppliers', function() {
    browser.get('http://localhost:8002/#/terminal/1');
    // filling form
    element(by.id('toggle-2')).click();
    // supplier_group
    var new_supplier_group = generateOptionValue('supplier_group');
    element(by.id('supplier_group-2')).click();    // click "Edit"
    element(by.id('edit-options-supplier_group')).
            element(by.model('new')).sendKeys(new_supplier_group);
    element(by.id('edit-options-supplier_group')).
            element(by.css('.add-field-option')).click().then(function(){

      var select = element(by.css('select[name="supplier_group"]'));
      select.$('[value="'+new_supplier_group+'"]').click();
      //element(by.cssContainingText('select[name="supplier_group"] option', field_val)).click();
    });
    element(by.id('supplier_group-2')).click();    // click "Hide"
    // supplier
    var new_supplier = generateOptionValue('supplier');
    element(by.id('supplier-2')).click();    // click "Edit"
    element(by.id('edit-options-supplier')).
            element(by.model('new')).sendKeys(new_supplier);
    element(by.id('edit-options-supplier')).
    element(by.css('.add-field-option')).click().then(function(){
      element(by.cssContainingText('select[name="supplier"] option', new_supplier)).click();
    });
    element(by.id('supplier-2')).click();    // click "Hide"
    // fleet_vessel
    var new_vessel = generateOptionValue('fleet_vessel');
    element(by.id('fleet_vessel-2')).click();    // click "Edit"
    element(by.id('edit-options-fleet_vessel')).
            element(by.model('new')).sendKeys(new_vessel);
    element(by.id('edit-options-fleet_vessel')).
    element(by.css('.add-field-option')).click().then(function(){
      element(by.cssContainingText('select[name="fleet_vessel"] option', new_vessel)).click();
    });
    element(by.id('fleet_vessel-2')).click();    // click "Hide"
    // fishing_area
    var new_area = generateOptionValue('fishing_area');
    element(by.id('fishing_area-2')).click();    // click "Edit"
    element(by.id('edit-options-fishing_area')).
            element(by.model('new')).sendKeys(new_area);
    element(by.id('edit-options-fishing_area')).
            element(by.css('.add-field-option')).click().then(function(){
      element(by.cssContainingText('select[name="fishing_area"] option', new_area)).click();
    });
    element(by.id('fishing_area-2')).click();    // click "Hide"
    // landing_location
    var new_landing_location = generateOptionValue('landing_location');
    element(by.id('landing_location-2')).click();    // click "Edit"
    element(by.id('edit-options-landing_location')).
            element(by.model('new')).sendKeys(new_landing_location);
    element(by.id('edit-options-landing_location')).
            element(by.css('.add-field-option')).click().then(function(){
      element(by.cssContainingText('select[name="landing_location"] option', new_landing_location)).click();
    });
    element(by.id('landing_location-2')).click();    // click "Hide"
    // ft_fa_code
    var new_ft_code = generateOptionValue('ft_fa_code');
    element(by.id('ft_fa_code-2')).click();    // click "Edit"
    element(by.id('edit-options-ft_fa_code')).
            element(by.model('new')).sendKeys(new_ft_code);
    element(by.id('edit-options-ft_fa_code')).
            element(by.css('.add-field-option')).click().then(function(){

      element(by.css('select[name="ft_fa_code"]')).$('[value="'+new_ft_code+'"]').click();
    });
    element(by.id('ft_fa_code-2')).click();    // click "Hide"

    element.all(by.css('input[type="radio"][name="fair_trade"]')).get(0).click().then(function(){
      // fill search field
      element(by.id('submit-2')).click().then(function(){
        element(by.model('searchText')).sendKeys(new_vessel).then(function(){
          //expect new vessel name to be in list of harvesters
          expect(element.all(by.cssContainingText('.list_item_val', new_vessel)).count()).toEqual(1);
        }); 
      }); 
    });

  });
});
