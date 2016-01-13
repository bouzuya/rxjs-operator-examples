import { Observable } from 'rxjs';
import pairwise from './pairwise';

export default function main() {
  const source = Observable.fromArray([1, 2, 3, 4, 5]);
  pairwise(source).subscribe(pair => console.log(pair));
}