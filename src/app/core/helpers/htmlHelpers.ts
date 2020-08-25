import * as _ from 'lodash';

export function getElementDetails() {
  let elementsArray: Array<any> = [];

  let htmlElements = document.getElementsByClassName('custom-elem');

  _.each(htmlElements, element => {
    let elementObject: {} = {};
    elementObject['id'] = element.id;
    elementObject['type'] = element.getAttribute('type');
    elementObject['category'] = element.getAttribute('category');

    elementsArray.push(elementObject);
    if (element.getAttribute('type') == 'indicator') {
      document.getElementById(element.id).innerHTML =
        '<span style="background-color:#ccc;padding: 4px;">loading indicator<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div></span>';
    } else if (element.getAttribute('type') == 'charts') {
      document.getElementById(element.id).innerHTML =
        '<div style="margin-top:8px;margin-bottom:12px;width:100%;height:250px;background-color:#ccc;text-align:center"><p style="padding:5px;">loading chart</p><div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div></div>';
    }
  });

  return elementsArray;
}
