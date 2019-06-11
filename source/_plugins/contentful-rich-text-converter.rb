require 'rich_text_renderer'
require 'byebug'

require_relative './ui-templates.rb'

class EmbeddedEntryRenderer < RichTextRenderer::BaseNodeRenderer
  include UITemplates
  include Jekyll::Filters::URLFilters
  def render(node)
    site = Jekyll.sites.first
    entry = node['data']['target']
    markdownConverter = site.find_converter_instance(::Jekyll::Converters::Markdown)
    # case statement to accommodate different embedded content model types
    case entry['sys']['content_type_id']
      when 'figure'
        figure_number = entry['figure_number']
        figure_title = entry['figure_title']
        figure_img_src = entry['figure_image']['url']
        figure_caption = entry['figure_caption']
        figure_alt_text = entry['alt_text']
        createChartHtml(figure_number, figure_title, figure_img_src, figure_caption, figure_alt_text)
      else
        puts "Can't render embedded entry"
    end
  end
end

class SilentNullRenderer < RichTextRenderer::BaseNodeRenderer
  def render(node)
    ""
  end
end

class HeadingAndIDRenderer < RichTextRenderer::BaseNodeRenderer
  include Jekyll::Filters
  def render(node)
    headerTagMap = {'heading-1' => 'h1', 'heading-2' => 'h2', 'heading-3' => 'h3', 'heading-4' => 'h4', 'heading-5' => 'h5', 'heading-6' => 'h6'}
    headingType = node['nodeType']
    headingValue = node['content'][0]['value']
    headingAnchorID = slugify(headingValue)
    headerTag = headerTagMap[headingType]
    "<#{headerTag}  class=\"internal-page-nav\" id=#{headingAnchorID}>#{headingValue}</#{headerTag}>"
  end
end


module Jekyll
  module DataFormatter
    def rich_text_to_html(content)
      renderer = RichTextRenderer::Renderer.new(nil => SilentNullRenderer, 'embedded-entry-block' => EmbeddedEntryRenderer, 'heading-2' => HeadingAndIDRenderer,  'heading-3' => HeadingAndIDRenderer)
      renderer.render(content)
    end
  end
end

Liquid::Template.register_filter(Jekyll::DataFormatter)