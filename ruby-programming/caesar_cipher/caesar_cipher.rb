class CaesarCipher
  def initialize
  end

  def cipher(message, shift)
    # split message for array indexing
    msg = message.split('')
    # store length
    len = msg.length

    i = 0
    until i == len do
      # convert to ascii code
      code = msg[i].ord
      shifted = code + shift
      # handle lowercase range
      if code >= 97 && code <= 122 
        mod = (shifted - 97) % 26
        msg[i] = (97 + mod).chr
      end
      # handle uppercase range
      if code >= 65 && code <= 90
        mod = (shifted - 65) % 26
        msg[i] = (65 + mod).chr
      end
      i += 1
    end
    msg.join('')
  end
end
