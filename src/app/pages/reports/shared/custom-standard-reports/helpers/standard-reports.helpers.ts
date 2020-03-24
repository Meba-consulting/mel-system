import * as _ from 'lodash';
import { Observable } from 'rxjs';

export function getIndicatorConfigsFromHtml() {
  let indicators = [];
  try {
    let indicatorElements = document.getElementsByTagName('INPUT');
    _.each(indicatorElements, (indicatorElement: any) => {
      if (indicatorElement.hasAttribute('value')) {
        indicatorElement.setAttribute('value', '');
      }
      if (indicatorElement.getAttribute('indicatorid'))
        indicators.push(indicatorElement.getAttribute('indicatorid'));
    });
  } catch (e) {
    console.log(e);
  }
  return indicators;
}

export function assignDataValuesToInputs(data$: Observable<any>, id) {
  data$.subscribe(data => {
    if (data && data['data']) {
      try {
        console.log("data['data'].rows[0][1]", data['data'].rows[0][0]);
        const element = document.getElementById('indicator' + id);
        if (element) {
          element.setAttribute('value', data['data'].rows[0][2]);
          element.setAttribute('style', 'text-align: center;');
        }
      } catch (e) {}
    }
  });
}
