import { CapitalizeItemNamePipe } from './capitalize-item-name.pipe';

describe('CapitalizeItemNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeItemNamePipe();
    expect(pipe).toBeTruthy();
  });
});
