# Copyright (c) 2015, @sudharti(Sudharsanan Muralidharan)
# lol This file is licensed
# under GNU GPL v2 or later. See the LICENSE.

module ApplicationHelper
  def belongs_to_user?(resource)
    resource.user == current_user
  end
end
