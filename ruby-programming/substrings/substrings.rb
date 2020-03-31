class Substring
  ##
  # Implement a method #substrings that takes a word as the first argument
  # and then an array of valid substrings (your dictionary) as the second
  # argument.
  # It should return a hash listing each substring (case insensitive) that
  # was found in the original string and how many times it was found.
  # Next, make sure you method can handle multiple words:
  # Recall how to turn strings into arrays and arrays into strings.

  def initialize
  end

  def substrings(str, arr)
    h = {}
    i = 0
    until i == arr.length do
      re = Regexp.new("(#{arr[i]})+")
      match = str.downcase.scan(re)
      if match.length > 0
        h[arr[i]] = match.length
      end
      i += 1
    end
    h
  end

end
