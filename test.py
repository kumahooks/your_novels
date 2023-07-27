def zip_str(target_str):
	output = ""
	last_char = ''
	counter_char = 0
	for i in target_str:
		if last_char == '':
			last_char = i
			counter_char += 1
			continue

		if last_char == i and counter_char < 9:
			counter_char += 1
			continue

		if last_char != i:
			if (counter_char > 1): output += str(counter_char)
			output += last_char
			last_char = i
			counter_char = 1
			continue

		if counter_char >= 9:
			if (counter_char > 1): output += str(counter_char)
			output += last_char
			last_char = i
			counter_char = 1
			continue

	if counter_char > 1:
		output += str(counter_char)

	output += last_char

	return output

print(zip_str("BBBBBBBBBBBACCCD"))