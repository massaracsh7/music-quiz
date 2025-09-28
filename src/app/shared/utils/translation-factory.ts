import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(): TranslateHttpLoader {
  return new TranslateHttpLoader();
}
