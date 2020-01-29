import { Controller, Get, Service } from "@tsed/common";
import { QueryParams } from "@tsed/common";

@Controller("/home")
export class CalendarCtrl {
  @Get()
  async findAll():Promise<any> {
    try
    {
      var data = JSON.parse('[{"author":"Paul LeBlanc, CNN","title":"US strike that killed Iranian commander starkly divides US lawmakers - CNN","description":"The US airstrike that killed Iran Quds Force commander Qasem Soleimani generated starkly different reactions along party lines Thursday night, with Republicans heaping praise on President Donald Trump and Democrats expressing concerns about the legality and c…","url":"https://www.cnn.com/2020/01/03/politics/us-reaction-quds-force-qasem-suleimani/index.html","urlToImage":"https://cdn.cnn.com/cnnnext/dam/assets/150304051521-pkg-holmes-soleimani-isis-in-iraq-00001504-super-tease.jpg","publishedAt":"2020-01-03T05:44:00Z","content":"Washington (CNN)The US airstrike that killed Iran Quds Force commander Qasem Soleimani generated starkly different reactions along party lines Thursday night, with Republicans heaping praise on President Donald Trump and Democrats expressing concerns about th… [+5215 chars]","sourceId":"cnn","sourceName":"CNN"},{"author":"CBS News","title":"Grand Canyon: Texas man missing for 11 days found alive on treacherous New Hance Trail - CBS News","description":"Before being located, the 58-year-old was last seen at a lodge in Grand Canyon Village on December 22.","url":"https://www.cbsnews.com/news/grand-canyon-texas-man-missing-for-11-days-found-alive-at-new-hance-trail-today-2020-01-02/","urlToImage":"https://cbsnews1.cbsistatic.com/hub/i/r/2020/01/03/f32f8115-0c9e-4930-957f-69f44966ca5f/thumbnail/1200x630/d6bc11f474b2cb4e14cd7a24a4f264d8/martin-edward-oconnor-source-national-park-service.jpg","publishedAt":"2020-01-03T04:29:00Z","content":"A man who had been missing at the Grand Canyon for 11 days has been found alive, according to National Park Service officials. Martin Edward O\'Connor, a 58-year-old from La Porte, Texas, was located Thursday morning and flown out of the canyon in a helicopter… [+484 chars]","sourceId":"cbs-news","sourceName":"CBS News"}]')
      return data;
    }
    catch(err)
    {
      return err.message;
    }
  }
}