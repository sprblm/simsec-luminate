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
        figure_description = markdownConverter.convert(entry['figure_description'])
        createChartHtml(figure_number, figure_title, figure_img_src, figure_caption, figure_alt_text, figure_description)
      else
        puts "Can't render embedded entry"
    end
  end
end

module Jekyll
  module DataFormatter
    def rich_text_to_html(content)
      renderer = RichTextRenderer::Renderer.new('embedded-entry-block' => EmbeddedEntryRenderer)
      renderer.render(content)
    end
  end
end

Liquid::Template.register_filter(Jekyll::DataFormatter)