import random

# Path to your VCF file
vcf_file = r"C:\Users\user\Downloads\ALL.chr22.phase3_shapeit2_mvncall_integrated_v5b.20130502.genotypes (2).vcf\ALL.chr22.phase3_shapeit2_mvncall_integrated_v5b.20130502.genotypes.vcf"

# Output file
output_file = "simplified_sample_full_row_50.tsv"

# Number of rows to sample
sample_size = 50

# Columns to keep
columns_to_keep = ['#CHROM', 'POS', 'ID', 'REF', 'ALT', 'QUAL', 'FILTER', 'INFO', 'FORMAT']

reservoir = []
header_indices = {}

row_num = 0

with open(vcf_file, 'r', encoding='utf-8') as f:
    for line in f:
        # Skip metadata lines
        if line.startswith("##"):
            continue
        
        # Process header line
        if line.startswith("#CHROM"):
            header = line.strip().split("\t")
            header_indices = {col: idx for idx, col in enumerate(header) if col in columns_to_keep}
            continue
        
        # Process data lines
        fields = line.strip().split("\t")
        row_filtered = [fields[header_indices[col]] for col in columns_to_keep]
        row_filtered.append(str(row_num)) # Add row number
        if len(reservoir) < sample_size:
            reservoir.append(row_filtered)
        else:
            # Reservoir sampling to generate k random rows of unknown length - needed because file size is too large to find the number of rows within the file
            i = random.randint(0, row_num)
            if i < sample_size:
                reservoir[i] = row_filtered

        
        if row_num % 1000 == 0:
            print(str(row_num) + " lines have been read")
        row_num += 1

# Update columns to keep to store row_num
columns_to_keep.append("row_num")

# Write the reservoir to a new TSV file
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("\t".join(columns_to_keep) + "\n")
    for row in reservoir:
        f.write("\t".join(row) + "\n")

print(f"Simplified sample of {sample_size} rows saved to {output_file}")

# Total run time approx 120 seconds
# 1.103 million rows