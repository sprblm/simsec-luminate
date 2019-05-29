module CustomURLFilters
  include Jekyll::Filters::URLFilters

  def get_relative_url(input)
    return if input.nil?
    # Jekyll's relative_url filter uses @context to get the baseurl so we are providing the site here instead
    site = Jekyll.sites.first
    return ensure_leading_slash(input.to_s) if site.config["baseurl"].nil?
    Addressable::URI.parse(
      ensure_leading_slash(site.config["baseurl"]) + ensure_leading_slash(input.to_s)
    ).normalize.to_s
  end

end