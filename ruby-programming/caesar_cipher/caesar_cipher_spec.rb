load 'caesar_cipher.rb'

RSpec.describe CaesarCipher, "#cipher" do
  cipher = CaesarCipher.new

  context "with lowercase letters," do
    it "handles small positive shifts" do
      expect(cipher.cipher("abcde", 5)).to eq("fghij")
    end

    it "handles large positive shifts" do
      expect(cipher.cipher("abcde", 26)).to eq("abcde")
    end

    it "handles small negative shifts" do
      expect(cipher.cipher("fghij", -5)).to eq("abcde")
    end

    it "handles large negative shifts" do
      expect(cipher.cipher("abcde", -26)).to eq("abcde")
    end
  end

  context "with uppercase letters," do
    it "handles small positive shifts" do
      expect(cipher.cipher("ABCDE", 5)).to eq("FGHIJ")
    end

    it "handles large positive shifts" do
      expect(cipher.cipher("ABCDE", 26)).to eq("ABCDE")
    end

    it "handles small negative shifts" do
      expect(cipher.cipher("FGHIJ", -5)).to eq("ABCDE")
    end

    it "handles large negative shifts" do
      expect(cipher.cipher("ABCDE", -26)).to eq("ABCDE")
    end
  end

  context "with lowercase and uppercase letters," do
    it "handles small positive shifts" do
      expect(cipher.cipher("AbCdE", 5)).to eq("FgHiJ")
    end

    it "handles large positive shifts" do
      expect(cipher.cipher("aBcDe", 26)).to eq("aBcDe")
    end

    it "handles small negative shifts" do
      expect(cipher.cipher("FgHiJ", -5)).to eq("AbCdE")
    end

    it "handles large negative shifts" do
      expect(cipher.cipher("aBcDe", -26)).to eq("aBcDe")
    end
  end

  context "with random characters and letters," do
    it "handles small positive shifts" do
      expect(cipher.cipher("AbCdE!", 5)).to eq("FgHiJ!")
    end

    it "handles large positive shifts" do
      expect(cipher.cipher("aBcDe?", 26)).to eq("aBcDe?")
    end

    it "handles small negative shifts" do
      expect(cipher.cipher("FgHiJ.", -5)).to eq("AbCdE.")
    end

    it "handles large negative shifts" do
      expect(cipher.cipher("aBc,De", -26)).to eq("aBc,De")
    end
  end
end
