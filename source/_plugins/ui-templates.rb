require_relative './url_filters.rb'

module UITemplates
  include CustomURLFilters
  def createChartHtml(number, title, img_src, caption, alt_text)

    chart_title = "<div class='figure-number'>Figure #{number}</div> <div class='figure-title'>#{title}</div>"
    chart_description_path = get_relative_url("/figures.html#figure-#{number}")
    chart_img_html = "<div class='figure-image-container'> <img src='#{img_src}' alt='#{alt_text}' longdesc='#{chart_description_path}' /></div>"
    chart_caption = "<figcaption>#{caption}</figcaption>"
    chart_description_link = "<div class='figure-link-container'><a class='figure-description-link' href='#{chart_description_path}'>Text description of chart</a></div>"

    chartHtml = [
      "<div class='chart-container'><figure>",
      chart_title,
      chart_caption,
      chart_img_html,
      chart_description_link,
      "</figure></div>"
    ].join('')

  end
end